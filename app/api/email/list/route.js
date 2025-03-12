// app/api/email/list/route.js
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { cookies } from "next/headers";

// Handle GET requests
export async function GET() {
  try {
    // Fetch emails logic here
    const emails = await fetchEmailsFromGmail();
    // Return Response
    return NextResponse.json(emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}

// Handle POST requests (if needed)
export async function POST() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

// Helper function to fetch emails from Gmail API
async function fetchEmailsFromGmail() {
  // Get access token from HTTP-only cookie
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    throw new Error("Unauthorized: No access token found");
  }

  // Initialize Gmail API client
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  // Fetch list of emails
  const response = await gmail.users.messages.list({
    userId: "me",
    maxResults: 10, // Adjust as needed
  });

  const messages = response.data.messages || [];

  // Fetch full details for each email
  const emails = await Promise.all(
    messages.map(async (message) => {
      const email = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
        format: "full",
      });

      // Extract relevant email details
      const headers = email.data.payload.headers;
      const from = headers.find((header) => header.name === "From")?.value;
      const subject = headers.find((header) => header.name === "Subject")?.value;
      const snippet = email.data.snippet;

      return {
        id: email.data.id,
        from,
        subject,
        snippet,
      };
    })
  );

  return emails;
}