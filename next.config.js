// /** @type {import('next').NextConfig} */
// const nextConfig = {
  
//    images: {
//     domains: ['localhost'],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: 'build',

  experimental: {
      serverActions: true,
      serverActionsBodySizeLimit: '1gb', // formData itms passing size
     
  },

}

module.exports = nextConfig

