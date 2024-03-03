/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },

    experimental: {
        serverActions: true,
      
    },
};

export default nextConfig;
