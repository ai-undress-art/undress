import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai-undress.online'
  const languages = ['zh', 'en']
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

  const sitemap: MetadataRoute.Sitemap = []

  // 为每个语言和路由生成sitemap条目
  languages.forEach(lang => {
    routes.forEach(route => {
      const url = `${baseUrl}/${lang}${route.path}`
      
      sitemap.push({
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

  // 添加根路径重定向
  sitemap.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(
        languages.map(l => [l, `${baseUrl}/${l}`])
      ),
    },
  })

  return sitemap
} 