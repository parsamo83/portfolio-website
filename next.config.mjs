import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // A stray package-lock.json higher up (C:\Users\parsa) would otherwise be taken as the workspace root.
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
  experimental: {
    // Next starts one worker per CPU core to pre-render /en and /de. On this 16-core
    // machine that is 15 processes for two pages, and the dev server crashed with
    // "Insufficient system resources" (Windows error 1450) while spawning them.
    cpus: 1,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
