import type { NextConfig } from 'next';

// The site is fully static: `next build` writes plain HTML/CSS/JS to `out/`,
// deployable on any host (Vercel, Netlify, Hostinger, Apache…).
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
