import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("[Business Info] Route started.");

    // Retrieve the access token from cookies
    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      console.error("[Business Info] Missing access token.");
      return NextResponse.json(
        { error: "Unauthorized: Missing access token" },
        { status: 401 }
      );
    }

    // Google Business Profile API endpoint for listing accounts
    const apiUrl = "https://mybusinessbusinessinformation.googleapis.com/v1/accounts";
    console.log("[Business Info] Fetching business accounts from:", apiUrl);

    // Make the request to Google
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Business Info] Google API error:", errorData);
      throw new Error(
        errorData.error?.message || "Failed to fetch business profile information"
      );
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

    // Filter for accounts where the user is the OWNER.
    const ownerAccounts = data.accounts.filter((account) => account.role === "OWNER");
    const selectedAccount = ownerAccounts.length > 0 ? ownerAccounts[0] : data.accounts[0];

    console.log("[Business Info] Selected account:", selectedAccount);
    return NextResponse.json(selectedAccount);

  } catch (error) {
    console.error("[Business Info] Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
