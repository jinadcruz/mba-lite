import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@mba-lite/shared'],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1',
  },
};

export default nextConfig;
