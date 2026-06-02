import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  compress: true,
  turbopack: {
    root: "./",
  },
  typedRoutes: true,
  logging: {
    fetches: { fullUrl: true, hmrRefreshes: true },
    browserToTerminal: true,
    incomingRequests: true,
    serverFunctions: true,
  },
  devIndicators: { position: "top-left" },
  experimental: {
    cssChunking: true,
    optimizeCss: true,
  },
};

export default nextConfig;
