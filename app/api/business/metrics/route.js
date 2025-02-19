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

    // Get the businessId from query parameters (you may pass it from your dashboard)
    const { searchParams } = new URL(req.url);
    const businessId = searchParams.get("businessId");
    if (!businessId) {
      return NextResponse.json(
        { error: "Missing businessId parameter" },
        { status: 400 }
      );
    }

    // Build the Business Performance API URL
    const performanceEndpoint = `https://businessprofileperformance.googleapis.com/v1/locations/${businessId}`;

    // Fetch performance metrics from Google
    const performanceResponse = await fetch(performanceEndpoint, {
      headers: { 
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
    });

    if (!performanceResponse.ok) {
      const errorData = await performanceResponse.json();
      throw new Error(errorData.error?.message || "Failed to fetch performance metrics");
    }

    const performanceData = await performanceResponse.json();
    
    // Extract metrics from the performance data
    // Note: Adjust these based on the actual response structure from the API
    const metrics = {
      reviewVolume: performanceData.metricValues?.reviewCount || 0,
      averageRating: Number((performanceData.metricValues?.averageRating || 0).toFixed(2)),
      responseRate: Number((performanceData.metricValues?.responseRate || 0).toFixed(2)),
      averageResponseTime: Number((performanceData.metricValues?.averageResponseTime || 0).toFixed(2))
    };

    return NextResponse.json(metrics);
    
  } catch (error) {
    console.error("❌ Metrics API Error:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
