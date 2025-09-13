"use client";

import { useState, useEffect } from "react";
import { SunMoonData, AstronomyEvent } from "@/lib/astronomyAPI";
import Image from "next/image";

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

  if (loading)
    return (
      <div className="bg-gray-800 p-4 rounded-lg mb-4 w-full">
        <p className="text-white">Loading astronomy data...</p>
      </div>
    );
  if (error)
    return (
      <div className="bg-gray-800 p-4 rounded-lg mb-4 w-full">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4 w-full max-w-3xl mt-6 md:mt-10">
      <h2 className="text-lg font-bold mb-3 text-white">Astronomy Today</h2>

      <div className="space-y-4">
        {sunMoon && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <div className="bg-gray-700 p-2 rounded">
              <strong className="text-blue-300 block text-xs">Sunrise</strong>
              <span className="text-white">{sunMoon.sunrise}</span>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <strong className="text-blue-300 block text-xs">Sunset</strong>
              <span className="text-white">{sunMoon.sunset}</span>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <strong className="text-blue-300 block text-xs">Moonrise</strong>
              <span className="text-white">{sunMoon.moonrise}</span>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <strong className="text-blue-300 block text-xs">Moonset</strong>
              <span className="text-white">{sunMoon.moonset}</span>
            </div>
            <div className="bg-gray-700 p-2 rounded md:col-span-1 col-span-2">
              <strong className="text-blue-300 block text-xs">
                Moon Phase
              </strong>
              <span className="text-white">{sunMoon.moon_phase}</span>
            </div>
          </div>
        )}

        {nasaEvent && (
          <div className="pt-4 border-t border-gray-600">
            <h3 className="text-md font-semibold mb-2 text-white">
              {nasaEvent.title}{" "}
              <span className="text-gray-400 text-sm">({nasaEvent.date})</span>
            </h3>

            <div className="relative w-full h-48 md:h-64 mb-3 rounded-lg overflow-hidden">
              <Image
                src={nasaEvent.url}
                alt={nasaEvent.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg"
              />
            </div>

            <div className="max-h-32 overflow-y-auto mb-3">
              <p className="text-gray-300 text-sm leading-relaxed pr-2">
                {nasaEvent.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
