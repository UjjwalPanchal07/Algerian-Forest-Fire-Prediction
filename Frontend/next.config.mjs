/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output:'export',
  eslint:{
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  async rewrites() {
    return [
      {
        source: '/api/predict',
        destination: 'http://localhost:5000/api/predict'
      }
    ]
  }
}

export default nextConfig


