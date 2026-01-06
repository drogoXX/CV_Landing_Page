/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages deployment to subdirectory
  basePath: '/CV_Landing_Page',
  assetPrefix: '/CV_Landing_Page/',
}

module.exports = nextConfig
