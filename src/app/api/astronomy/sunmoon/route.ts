import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const lat = req.nextUrl.searchParams.get("lat") ?? "51.5";
    const lon = req.nextUrl.searchParams.get("lon") ?? "-0.12";
    const dt = new Date().toISOString().split("T")[0];

    // Use server-side environment variable (not NEXT_PUBLIC_)
    const WEATHER_KEY = process.env.WEATHER_API_KEY;
    if (!WEATHER_KEY) {
      throw new Error("Weather API key not configured");
    }

    const res = await fetch(
      `https://api.weatherapi.com/v1/astronomy.json?key=${WEATHER_KEY}&q=${lat},${lon}&dt=${dt}`
    );

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`WeatherAPI request failed: ${res.status} ${res.statusText} - ${errorData}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Sun/Moon API error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
