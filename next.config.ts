import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb", // Example value
      allowedOrigins: ["https://localhost:3000/*"], // Example value
    },
  },
};


export default nextConfig;
