const WEATHER_KEY = process.env.WEATHER_API_KEY;
const NASA_KEY = process.env.NASA_API_KEY;

export interface SunMoonData {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
}

export interface AstronomyEvent {
  title: string;
  url: string;
  date: string;
  explanation: string;
}

export async function getSunMoon(lat: number, lon: number): Promise<SunMoonData> {
  if (!WEATHER_KEY) throw new Error("Weather API key not configured");
  
  const res = await fetch(`https://api.weatherapi.com/v1/astronomy.json?key=${WEATHER_KEY}&q=${lat},${lon}&dt=${new Date().toISOString().split('T')[0]}`);
  if (!res.ok) throw new Error("Failed to fetch sun/moon data");
  const data = await res.json();
  return {
    sunrise: data.astronomy.astro.sunrise,
    sunset: data.astronomy.astro.sunset,
    moonrise: data.astronomy.astro.moonrise,
    moonset: data.astronomy.astro.moonset,
    moon_phase: data.astronomy.astro.moon_phase
  };
}

export async function getNASAEvent(): Promise<AstronomyEvent> {
  if (!NASA_KEY) throw new Error("NASA API key not configured");
  
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch NASA APOD");
  const data = await res.json();
  return {
    title: data.title,
    url: data.url,
    date: data.date,
    explanation: data.explanation
  };
}