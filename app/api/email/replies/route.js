// app/api/emails/route.js
import { google } from "googleapis";
import { NextResponse } from "next/server";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function GET(request) {
  try {
    // Retrieve tokens from secure storage (e.g., database or session)
    const tokens = {
      access_token: process.env.GOOGLE_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    };

    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error("No access or refresh token found");
    }

    // Set credentials
    oauth2Client.setCredentials(tokens);

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    // Fetch emails from the inbox
    const { data } = await gmail.users.messages.list({
      userId: "me",
      q: "in:inbox", // Filter for inbox emails
    });

    const messages = data.messages || [];

    // Fetch details for each email
    const emails = await Promise.all(
      messages.map(async (message) => {
        const { data } = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
          format: "metadata",
          metadataHeaders: ["From", "Subject", "Date"],
        });

        // Check if the email has a reply
        const thread = await gmail.users.threads.get({
          userId: "me",
          id: message.threadId,
        });

        const hasReply = thread.data.messages.length > 1;

        return {
          id: message.id,
          from: data.payload.headers.find((header) => header.name === "From").value,
          subject: data.payload.headers.find((header) => header.name === "Subject").value,
          date: data.payload.headers.find((header) => header.name === "Date").value,
          hasReply,
        };
      })
    );

    // Filter emails with replies
    const repliedEmails = emails.filter((email) => email.hasReply);

    return NextResponse.json({ repliedEmails });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json(
      { error: "Failed to fetch emails", details: error.message },
      { status: 500 }
    );
  }
}