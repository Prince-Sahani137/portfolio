import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static build -> `out/` folder, which Cloudflare Pages serves from its CDN.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
