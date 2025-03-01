import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const accessToken = req.cookies.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user info");
    }

    const userData = await userResponse.json();
    console.log("👤 User Info:", userData);
    return NextResponse.json(userData);

  } catch (error) {
    console.error("❌ User Info Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
