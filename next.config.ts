import type { NextConfig } from "next";

// Security headers on every page. The site embeds nothing from other origins and is never framed.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Legal text lives on zenproducts.ai, the pages the App Store listing points at. Temporary
  // redirects, so this site can carry its own copy later without browsers having cached the move.
  async redirects() {
    return [
      { source: "/privacy", destination: "https://www.zenproducts.ai/apps/zen-teleprompter/privacy", permanent: false },
      { source: "/terms", destination: "https://www.zenproducts.ai/apps/zen-teleprompter/terms", permanent: false },
    ];
  },
};

export default nextConfig;
