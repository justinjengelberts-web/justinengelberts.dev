import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async redirects() {
    return [
      {
        source: '/projects/adhoc-selectietool',
        destination: '/projects/adhoc-platform',
        permanent: true,
      },
      {
        source: '/projects/crewvee-crm',
        destination: '/projects/leadhub',
        permanent: true,
      },
    ]
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
