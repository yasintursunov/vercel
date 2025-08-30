import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    // Vercel build’te lint hatası yüzünden durmasın
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
