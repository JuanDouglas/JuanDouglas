import type { NextConfig } from "next";

// For GitHub Pages deployment
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove basePath and assetPrefix for user GitHub Pages
  // basePath and assetPrefix are only needed for project pages (repo.github.io/project-name)
  // For user pages (username.github.io), leave them empty
};

export default nextConfig;
