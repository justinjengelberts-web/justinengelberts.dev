import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async rewrites() {
    return [
      {
        source: '/demo/:slug*',
        destination: 'https://crm.crewvee.com/demo/:slug*',
      },
      {
        source: '/assets/:path*',
        destination: 'https://crm.crewvee.com/assets/:path*',
      },
    ]
  },
};

export default nextConfig;
