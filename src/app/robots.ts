import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/*.json$',
          '/*?*utm_*',
          '/*?*fbclid*',
          '/*?*gclid*',
        ],
      },
      // 允许主流的SEO分析工具爬虫
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'Googlebot',
          'Bingbot',
        ],
        allow: '/',
        // 可以根据需要设置更精细的规则
        // crawlDelay: 1, // Googlebot 会忽略此指令
      },
      // 社交媒体爬虫
      {
        userAgent: ['facebookexternalhit', 'Twitterbot'],
        allow: '/',
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-images.xml`,
    ],
    host: baseUrl,
  }
} 