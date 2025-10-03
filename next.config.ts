import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const isDev = process.env.NODE_ENV !== 'production';
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' https://challenges.cloudflare.com${isDev ? " 'unsafe-inline' 'unsafe-eval'" : ""};
  frame-src https://challenges.cloudflare.com;
  img-src 'self' data: https:;
  style-src 'self' 'unsafe-inline';
  connect-src 'self' https://challenges.cloudflare.com https://${process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/^https?:\/\//, "") || "localhost"};
`;

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/^https?:\/\//, "") || "localhost",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\n/g, '').replace(/\s{2,}/g, ' '),
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
