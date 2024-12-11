/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mytro.in",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "domf5oio6qrcr.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "5.imimg.com",
      },
    ],
  },
};

export default nextConfig;
