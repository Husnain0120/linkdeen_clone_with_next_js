import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["linkedincolne.blob.core.windows.net"], // Add the domain for external image source
  },
};

export default nextConfig;
