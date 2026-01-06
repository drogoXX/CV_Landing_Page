/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // EDIT: Update basePath if deploying to a subdirectory (e.g., '/repo-name')
  // basePath: '/CV_Landing_Page',
}

module.exports = nextConfig
