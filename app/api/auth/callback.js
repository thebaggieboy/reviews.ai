            

export default async function handler(req, res) {
    try {
      console.log("✅ OAuth Callback Hit");
  
      // 1️⃣ Extract the Authorization Code from Query Params
      const { code } = req.query;
      console.log("🔹 Received Code:", code);
  
      if (!code) {
        console.error("❌ No authorization code provided");
        return res.status(400).json({ error: "No authorization code provided" });
      }
  
      // 2️⃣ Ensure Required Environment Variables Exist
      if (
        !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
        !process.env.NEXT_PUBLIC_GOOGLE_SECRET ||
        !process.env.NEXT_PUBLIC_REDIRECT_URI
      ) {
        console.error("❌ Missing environment variables");
        return res.status(500).json({ error: "Server misconfiguration: Missing env variables" });
      }
  
      // 3️⃣ Prepare Token Exchange Request
      const tokenUrl = "https://oauth2.googleapis.com/token";
      const payload = {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      };
  
      console.log("🔹 Exchanging code for access token...");
  
      // 4️⃣ Send Token Exchange Request to Google
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload),
      });
  
      const data = await response.json();
      console.log("🔹 Token Exchange Response:", data);
  
      // 5️⃣ Handle Google OAuth Errors
      if (!response.ok || data.error) {
        console.error("❌ OAuth Token Exchange Error:", data.error || data);
        return res.status(400).json({ error: "Failed to obtain access token", details: data });
      }
  
      // 6️⃣ Store Access Token Securely (You can also use JWT or Session)
      res.setHeader(
        "Set-Cookie",
        `google_access_token=${data.access_token}; HttpOnly; Path=/; Secure; SameSite=Lax`
      );
      console.log("✅ Access Token Stored in Cookie");
  
      // 7️⃣ Redirect User to Dashboard
      console.log("🚀 Redirecting to /dashboard...");

      return res.redirect(302, "/dashboard");
  
    } catch (error) {
      console.error("❌ Unexpected Error:", error);
      return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  }
  