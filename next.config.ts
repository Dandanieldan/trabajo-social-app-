import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Force Turbopack to lock its root to the project directory,
    // avoiding warnings and incorrect path resolution from parent lockfiles.
    root: process.cwd(),
  },
};

export default nextConfig;
