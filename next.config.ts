import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Use remotePatterns instead of domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "linkedincolne.blob.core.windows.net", // Blob storage hostname
        pathname: "/posts/**", // Adjust the path based on your image structure
      },
    ],
  },
};

export default nextConfig;
