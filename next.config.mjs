/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dwce5qugf/**', // Replace with your cloud name
      },
    ],
  },
  
};

export default nextConfig;
