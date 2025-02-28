// /app/api/business/list/route.js
import { NextResponse } from "next/server";

// In-memory cache (for production consider Redis or another shared cache)
let cachedAccounts = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// Exponential backoff helper to retry on 429 errors
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

export async function GET(req) {
  try {
    console.log("[Business List] Route started.");
    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.json(
        { error: "Unauthorized: Missing access token" },
        { status: 401 }
      );
    }
    const now = Date.now();
    if (cachedAccounts && now - cacheTimestamp < CACHE_DURATION_MS) {
      console.log("[Business List] Returning cached accounts.");
      return NextResponse.json({ accounts: cachedAccounts });
    }
    const apiUrl = "https://mybusinessbusinessinformation.googleapis.com/v1/accounts";
    console.log("[Business List] Fetching accounts from:", apiUrl);
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
      console.error("[Business List] Google API error:", errorData);
      throw new Error(errorData.error?.message || "Failed to fetch business accounts");
    }
    const data = await response.json();
    if (!data.accounts || data.accounts.length === 0) {
      return NextResponse.json(
        { error: "No business accounts found for this user." },
        { status: 404 }
      );
    }
    cachedAccounts = data.accounts;
    cacheTimestamp = now;
    console.log("[Business List] Accounts fetched:", data.accounts);
    return NextResponse.json({ accounts: data.accounts });
  } catch (error) {
    console.error("[Business List] Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
