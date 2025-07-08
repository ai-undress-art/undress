import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/temp/',
          '/*.json$',
          '/*?*utm_*',
          '/*?*fbclid*',
          '/*?*gclid*',
          '/search?*',
          '/filter?*',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      // 阻止恶意爬虫
      {
        userAgent: [
          'AhrefsBot',
          'MJ12bot',
          'DotBot',
          'SemrushBot',
          'BLEXBot',
          'MegaIndex',
          'spbot',
          'PetalBot',
          'YandexBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: [
      'https://ai-undress.online/sitemap.xml',
      'https://ai-undress.online/sitemap-images.xml',
    ],
    host: 'https://ai-undress.online',
  }
} 