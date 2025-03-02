/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        ws: false,
        'utf-8-validate': false,
        bufferutil: false,
      };
    }
    return config;
  },
  transpilePackages: [
    '@supabase/realtime-js',
    '@use-gesture/core',
    '@use-gesture/react'
  ],
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js']
  },
  images: {
    domains: ['localhost', 'app.xthreat.eu'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'development' 
              ? 'http://localhost:3000' 
              : 'https://app.xthreat.eu',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 