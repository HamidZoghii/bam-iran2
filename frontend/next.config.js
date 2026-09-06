/** @type {import('next').NextConfig} */
// Configured for a static export so this can be hosted directly on
// GitHub Pages (no Node server there). This turns off everything that
// needs a server: Image Optimization, redirects()/rewrites() in config,
// Route Handlers, ISR. None of those are used in this project.
//
// NEXT_BASE_PATH is injected at build time by
// .github/workflows/deploy-pages.yml with the repo's own name (GitHub
// Pages project sites are served at username.github.io/repo-name/, so
// every internal link needs that prefix). Building locally without it
// set is fine for `npm run dev` — basePath is just "" then.
const basePath = process.env.NEXT_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
