import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  cacheComponents: true,
  images: {
    domains: ['localhost', 'cache.marriott.com', 'media-api.xogrp.com'], // Add your image domains here
  },
}

export default nextConfig
