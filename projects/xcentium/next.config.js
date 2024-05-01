/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/internal/sitemap',
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    return config
  },
}

module.exports = nextConfig
