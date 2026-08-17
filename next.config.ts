import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  compress: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
    root: "./",
  },
  output: "standalone",
  typedRoutes: true,
  logging: {
    fetches: { fullUrl: true, hmrRefreshes: true },
    browserToTerminal: true,
    incomingRequests: true,
    serverFunctions: true,
  },
  devIndicators: { position: "top-left" },
  experimental: {
    optimizePackageImports: ["react", "radix-ui"],
    optimizeServerReact: true,
    cssChunking: true,
    typedEnv: process.env.NODE_ENV === "development",
    webpackMemoryOptimizations: process.env.NODE_ENV === "development",
  },
  images: {
    remotePatterns: [
      new URL("https://media.valorant-api.com/**"),
      new URL("https://owcdn.net/img/**"),
      new URL("https://www.vlr.gg/img/**"),
    ],
  },
};

export default nextConfig;
