import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("✅ API Route Hit: /api/auth/callback");

  try {
    // Extract the code from the request
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
    }

    console.log("🔹 Received OAuth Code:", code);

    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || "Failed to exchange tokens");
    }

    console.log("🔑 Tokens Received:", tokenData);

    // Modified redirect approach
    const response = NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_APP_URL || req.url));
    response.cookies.set("access_token", tokenData.access_token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });
    response.cookies.set("refresh_token", tokenData.refresh_token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    return response;

  } catch (error) {
    console.error("❌ OAuth Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
