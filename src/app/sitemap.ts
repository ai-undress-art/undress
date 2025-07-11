import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  // 以根目录下的多语言配置为准，保持与 src/i18n/routing.ts 一致
  const languages = routing.locales;
  const currentDate = new Date()
  
  const routes = [
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'daily' as const,
      lastModified: currentDate,
    },
    {
      path: '/about',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
      lastModified: currentDate,
    },
    {
      path: '/contact',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
      lastModified: currentDate,
    },
    {
      path: '/privacy',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
      lastModified: currentDate,
    },
    {
      path: '/terms',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
      lastModified: currentDate,
    },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // 为每个语言和路由生成sitemap条目
  languages.forEach(lang => {
    routes.forEach(route => {
      const url = `${baseUrl}/${lang}${route.path}`
      
      sitemapEntries.push({
        url,
        lastModified: route.lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            languages.map(l => [l, `${baseUrl}/${l}${route.path}`])
          ),
        },
      })
    })
  })

  return sitemapEntries
} 