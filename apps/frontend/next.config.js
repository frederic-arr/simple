/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack5: true,
  swcMinify: true,
  images: {
    domains: ['m.media-amazon.com'],
  },
  async rewrites() {
    console.log(`${process.env.API_URI}/:path*`);
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URI}/:path*`,
      },
      {
        source: '/',
        destination: '/nodes',
      },
    ]
  },
}
