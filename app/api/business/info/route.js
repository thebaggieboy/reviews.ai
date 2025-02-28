import { NextResponse } from "next/server";

// Global in‑memory cache (for serverless, consider using Redis or another shared store)
let cachedAccount = null;
let cacheTimestamp = 0;
// Cache duration (e.g., 5 minutes)
const CACHE_DURATION_MS = 5 * 60 * 1000;

// Helper: Exponential backoff for fetch calls
async function fetchWithExponentialBackoff(url, options, retries = 3, delay = 500) {
  try {
    const res = await fetch(url, options);
    if (res.status === 429 && retries > 0) {
      console.warn(`[ExponentialBackoff] 429 received. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return await fetchWithExponentialBackoff(url, options, retries - 1, delay * 2);
    }
    return res;
  } catch (error) {
    if (retries > 0) {
      console.warn(`[ExponentialBackoff] Error: ${error.message}. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return await fetchWithExponentialBackoff(url, options, retries - 1, delay * 2);
    }
    throw error;
  }
}

// Helper: Update cache in background
async function updateCache(accessToken) {
  console.log("[Cache] Updating cache in background.");
  const apiUrl = "https://mybusinessbusinessinformation.googleapis.com/v1/accounts";
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetchWithExponentialBackoff(apiUrl, options);
  if (response.ok) {
    const data = await response.json();
    if (data.accounts && data.accounts.length > 0) {
      const ownerAccounts = data.accounts.filter((account) => account.role === "OWNER");
      cachedAccount = ownerAccounts.length > 0 ? ownerAccounts[0] : data.accounts[0];
      cacheTimestamp = Date.now();
      console.log("[Cache] Updated successfully.");
    }
  } else {
    const err = await response.json();
    console.error("[Cache] Failed to update cache:", err);
  }
}

export async function GET(req) {
  try {
    console.log("[Business Info] Route started.");

    // Retrieve access token from cookies
    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      console.error("[Business Info] Missing access token.");
      return NextResponse.json(
        { error: "Unauthorized: Missing access token" },
        { status: 401 }
      );
    }

    const now = Date.now();

    // If cache exists and is still valid, return it immediately
    if (cachedAccount && now - cacheTimestamp < CACHE_DURATION_MS) {
      console.log("[Business Info] Returning cached account.");

      // If cache is nearly expired (e.g. 80% of CACHE_DURATION_MS), update it in the background
      if (now - cacheTimestamp > CACHE_DURATION_MS * 0.8) {
        updateCache(accessToken).catch((err) =>
          console.error("[Business Info] Background cache update failed:", err.message)
        );
      }
      return NextResponse.json(cachedAccount);
    }

    // Otherwise, fetch fresh data from Google
    const apiUrl = "https://mybusinessbusinessinformation.googleapis.com/v1/accounts";
    console.log("[Business Info] Fetching business accounts from:", apiUrl);
    const options = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetchWithExponentialBackoff(apiUrl, options);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Business Info] Google API error:", errorData);
      // If cached data exists, return stale data as fallback
      if (cachedAccount) {
        console.warn("[Business Info] Returning stale cached data due to API error.");
        return NextResponse.json(cachedAccount);
      }
      throw new Error(errorData.error?.message || "Failed to fetch business profile information");
    }

    const data = await response.json();
    console.log("[Business Info] Data received:", data);

    if (!data.accounts || data.accounts.length === 0) {
      console.error("[Business Info] No business accounts found.");
      return NextResponse.json(
        { error: "No business profile found for this user." },
        { status: 404 }
      );
    }

    // Filter for the account where the user is the OWNER
    const ownerAccounts = data.accounts.filter((account) => account.role === "OWNER");
    const selectedAccount = ownerAccounts.length > 0 ? ownerAccounts[0] : data.accounts[0];

    console.log("[Business Info] Selected account:", selectedAccount);
    // Update the cache
    cachedAccount = selectedAccount;
    cacheTimestamp = now;

    return NextResponse.json(selectedAccount);
  } catch (error) {
    console.error("[Business Info] Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
