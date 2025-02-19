export default async function handler(req, res) {
    const { code } = req.query;
  
    if (!code) {
      return res.status(400).json({ error: "No code provided" });
    }
  
    const tokenUrl = "https://oauth2.googleapis.com/token";
  
    const payload = {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      code,
      grant_type: "authorization_code", 
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    };
  
    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload),
      });
  
      const data = await response.json();
      console.log("Data: ", data)
  
      if (data.error) {
        return res.status(400).json({ error: data.error });
      }
  
      // Store tokens in session (or cookies/local storage for now)
      res.setHeader(
        "Set-Cookie",
        `google_access_token=${data.access_token}; HttpOnly; Path=/;`
      );
  
      return res.redirect(`/dashboard`);
    } catch (error) {
      return res.status(500).json({ error: "Token exchange failed" });
    }
  }
  