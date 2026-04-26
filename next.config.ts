import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: typeof process !== 'undefined' ? process.cwd() : '.',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      const existingIgnored = config.watchOptions?.ignored;
      const ignored: string[] = [];
      if (Array.isArray(existingIgnored)) {
        existingIgnored.forEach((v) => { if (typeof v === 'string' && v) ignored.push(v); });
      } else if (typeof existingIgnored === 'string' && existingIgnored) {
        ignored.push(existingIgnored);
      }
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          ...ignored,
          '**/.playwright-mcp/**',
          '**/reports/**',
          '**/.codex-*.log',
          '**/.measure-*.log',
          '**/.tmp-dev-*.log',
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
