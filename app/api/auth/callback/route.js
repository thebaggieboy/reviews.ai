import { NextResponse } from "next/server";
import { selectToken, setToken } from "@/features/token/tokenSlice";
import { useSelector } from "react-redux";
import Cookies from "js-cookie"

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

    // Save token data to user's account
    // const user = await User.findById(tokenData.userId);
    // user.googleTokens = tokens;
    const tokenData = await tokenResponse.json();
    


    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || "Failed to exchange tokens");
    }

    const { access_token, refresh_token, expires_in } = tokenData
    const expiry_date = Date.now() + expires_in * 1000
    
    // Step 2: Save tokens to your backend
    const token = Cookies.get('token') // Get your auth token
    
    const saveResponse = await fetch("https://email-management-backend.onrender.com/api/user/google-tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        access_token,
        refresh_token,
        expiry_date
      }),
      credentials: "include"
    })
    
    if (!saveResponse.ok) {
      const errorData = await saveResponse.json()
      throw new Error(errorData.message || "Failed to save Google tokens")
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
