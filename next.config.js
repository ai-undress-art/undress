const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@heroui/react', '@heroui/system', '@heroui/theme'],
  experimental: {
    esmExternals: 'loose'
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // CSP 已禁用 - 允许所有脚本和资源
          // {
          //   key: 'Content-Security-Policy',
          //   value: "default-src *; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'; img-src * data: blob:; font-src * data:; connect-src *; frame-src *; object-src *; media-src * data:;"
          // },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'  // 改为更宽松的设置
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ]
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    // 允许 blob URLs 和 data URLs
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'canvas', 'jsdom'];
    return config;
  }
}

module.exports = withNextIntl(nextConfig);