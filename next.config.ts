import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['apod.nasa.gov'], // Add this line
  },
};

export default nextConfig;