// next.config.mjs (Edit file ini yang sudah ada)
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig; // <-- Perubahan di sini dari module.exports menjadi export default