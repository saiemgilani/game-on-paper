/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.buymeacoffee.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
        port: '',
        pathname: '/**', // for espn images
      },
      {
        protocol: 'https',
        hostname: 'a1.espncdn.com',
        port: '',
        pathname: '/**', // for espn images
      },
      {
        protocol: 'https',
        hostname: 'a2.espncdn.com',
        port: '',
        pathname: '/**', // for espn images
      },
      {
        protocol: 'https',
        hostname: 'a3.espncdn.com',
        port: '',
        pathname: '/**', // for espn images
      },
      {
        protocol: 'https',
        hostname: 'a4.espncdn.com',
        port: '',
        pathname: '/**', // for espn images
      },
      {
        protocol: 'https',
        hostname: 's.espncdn.com', // for espn images
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/**', // images from spotify
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**', // for github avatars
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**', // for github images
      },
      {
        protocol: 'https',
        hostname: 'nba.com',
        port: '',
        pathname: '/**', // for nba images
      },
      {
        protocol: 'https',
        hostname: 'www.nba.com',
        port: '',
        pathname: '/**', // for nba images
      },
      {
        protocol: 'https',
        hostname: 'ak-static.cms.nba.com',
        port: '',
        pathname: '/**', // for nba images
      },
      {
        protocol: 'https',
        hostname: 'cdn.nba.com',
        port: '',
        pathname: '/**', // for nba images
      },
    ],
    domains: ['a.espncdn.com', 's.espncdn.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
