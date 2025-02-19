import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Retrieve the access token from cookies
    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.json(
        { error: "Unauthorized: Missing access token" },
        { status: 401 }
      );
    }

    // Define the URL for the Business Profile API to list accounts
    const apiUrl = "https://mybusinessbusinessinformation.googleapis.com/v1/accounts";

    // Make the request using the stored access token
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // If the response is not OK, extract and throw an error
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google API Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to fetch business profile information");
    }

    // Parse the JSON data from the response
    const data = await response.json();

    // Ensure there is at least one account returned
    if (!data.accounts || data.accounts.length === 0) {
      return NextResponse.json(
        { error: "No business profile found for this user." },
        { status: 404 }
      );
    }

    // Optionally filter for accounts where the user is an OWNER
    const ownerAccounts = data.accounts.filter((account) => account.role === "OWNER");
    // If at least one owner account exists, choose it; otherwise, fall back to the first account.
    const selectedAccount = ownerAccounts.length > 0 ? ownerAccounts[0] : data.accounts[0];

    return NextResponse.json(selectedAccount);
  } catch (error) {
    console.error("❌ Business Profile Info Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
