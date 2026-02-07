import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `output: "export"` — we need server-side features
  // (API routes, server actions, middleware) as we add functionality.
  // Firebase Hosting works with full Next.js via the framework adapter.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
