/** @type {import('next').NextConfig} */

const nextConfig = {
    distDir: 'build',
    typescript: {
        // ignoreBuildErrors: true
    },

    experimental: {
        serverActions: true,
        serverActionsBodySizeLimit: '1gb', // formData itms passing size
        serverComponentsExternalPackages: ["pdf-parse"],
    },
    
    // Disable HMR
    // dev: false, // auto reload page on code change

}

module.exports = nextConfig
