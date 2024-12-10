/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[j|t]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['truescale-bucket.s3.ap-south-1.amazonaws.com'],
  },
  output: 'standalone',
}

module.exports = nextConfig
