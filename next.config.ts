import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow videos and images to be served efficiently
  async headers() {
    return [
      {
        source: '/media/:path*.mp4',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Accept-Ranges', value: 'bytes' },
        ],
      },
      {
        source: '/media/:path*.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Required: silence Turbopack default + webpack conflict warning
  turbopack: {},
}

export default nextConfig
