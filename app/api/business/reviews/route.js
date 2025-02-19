import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const accessToken = req.cookies.get("access_token")?.value;
    const businessId = req.nextUrl.searchParams.get("businessId");

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!businessId) {
      return NextResponse.json({ error: "Business ID required" }, { status: 400 });
    }

    // Fetch Google Business Reviews
    const reviewResponse = await fetch(
      `https://mybusiness.googleapis.com/v4/accounts/${businessId}/locations/reviews`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!reviewResponse.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const reviewData = await reviewResponse.json();
    return NextResponse.json(reviewData);

  } catch (error) {
    console.error("❌ Google Business Reviews Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
