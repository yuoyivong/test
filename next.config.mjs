/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_APIURL: "http://localhost:9098/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
