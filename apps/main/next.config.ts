import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: [
    '@portfolio/ui',
    '@portfolio/theme',
    '@portfolio/data',
    '@portfolio/db',
    '@portfolio/mock-backend',
    '@portfolio/industry',
  ],
};

export default nextConfig;
