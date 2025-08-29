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
        destination: 'https://algerian-forest-fire-prediction-3cpe.onrender.com/api/predict'
      }
    ]
  }
}

export default nextConfig


