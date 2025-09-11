"use client";

import { useState, useEffect } from "react";
import { SunMoonData, AstronomyEvent } from "@/lib/astronomyAPI";

export default function AstronomyWidgetClient() {
  const [sunMoon, setSunMoon] = useState<SunMoonData | null>(null);
  const [nasaEvent, setNASAEvent] = useState<AstronomyEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const { latitude, longitude } = pos.coords;

        const sunMoonRes = await fetch(
          `/api/astronomy/sunmoon?lat=${latitude}&lon=${longitude}`
        );
        if (!sunMoonRes.ok) {
          const errData = await sunMoonRes.json();
          throw new Error(errData.error || "Failed to fetch sun/moon data");
        }
        const sunMoonData = await sunMoonRes.json();

        const nasaRes = await fetch("/api/astronomy/nasa");
        if (!nasaRes.ok) {
          const errData = await nasaRes.json();
          throw new Error(errData.error || "Failed to fetch NASA data");
        }
        const nasaData = await nasaRes.json();

        setSunMoon({
          sunrise: sunMoonData.astronomy.astro.sunrise,
          sunset: sunMoonData.astronomy.astro.sunset,
          moonrise: sunMoonData.astronomy.astro.moonrise,
          moonset: sunMoonData.astronomy.astro.moonset,
          moon_phase: sunMoonData.astronomy.astro.moon_phase,
        });

        setNASAEvent({
          title: nasaData.title,
          url: nasaData.url,
          date: nasaData.date,
          explanation: nasaData.explanation,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading astronomy data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-gray-800 p-3 rounded-lg mb-4 w-full max-w-3xl mt-10">
      <h2 className="text-lg font-bold mb-2">Astronomy Today</h2>

      <div className="space-y-3">
        {sunMoon && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
            <p>
              <strong>Sunrise:</strong>
              <br />
              {sunMoon.sunrise}
            </p>
            <p>
              <strong>Sunset:</strong>
              <br />
              {sunMoon.sunset}
            </p>
            <p>
              <strong>Moonrise:</strong>
              <br />
              {sunMoon.moonrise}
            </p>
            <p>
              <strong>Moonset:</strong>
              <br />
              {sunMoon.moonset}
            </p>
            <p>
              <strong>Moon Phase:</strong>
              <br />
              {sunMoon.moon_phase}
            </p>
          </div>
        )}

        {nasaEvent && (
          <div className="pt-3 border-t border-gray-700">
            <h3 className="text-sm font-semibold mb-1">
              {nasaEvent.title} ({nasaEvent.date})
            </h3>
            <img
              src={nasaEvent.url}
              alt={nasaEvent.title}
              className="rounded-lg mb-2 w-full max-w-xs mx-auto"
            />
            <p className="text-gray-300 text-xs">{nasaEvent.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
