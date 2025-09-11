import { NextResponse } from "next/server";

export async function GET() {
  try {
    const NASA_KEY = process.env.NASA_API_KEY;
    if (!NASA_KEY) {
      throw new Error("NASA API key not configured");
    }
    
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`);
    
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`NASA API request failed: ${res.status} ${res.statusText} - ${errorData}`);
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("NASA API error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}