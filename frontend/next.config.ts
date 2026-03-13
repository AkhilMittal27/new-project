import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://10.209.249.45:3000",
    "http://localhost:3000",
  ],
};

export default nextConfig;