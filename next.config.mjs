/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/x-charts', 'recharts'],  // Add this line
  images: {
    domains: ['assets.aceternity.com'], 
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '<https://cal.com>; rel=preconnect'
          }
        ]
      }
    ]
  }
};

export default nextConfig;