import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://ai-undress.online'
  const images = [
    {
      loc: `${baseUrl}/images/logo.png`,
      caption: 'Ai Undress Logo - AI图像处理工具标志',
      title: 'Ai Undress Logo',
      license: `${baseUrl}/terms`,
    },
    {
      loc: `${baseUrl}/images/og-image.png`,
      caption: 'Ai Undress - Social sharing image',
      title: 'Ai Undress Open Graph Image',
      license: `${baseUrl}/terms`,
    },
    {
      loc: `${baseUrl}/images/bgLg.webp`,
      caption: 'Ai Undress 背景图片 - 高质量WebP格式',
      title: 'Ai Undress Background',
      license: `${baseUrl}/terms`,
    },
    {
      loc: `${baseUrl}/images/bgSm.webp`,
      caption: 'Ai Undress 小尺寸背景图片 - 移动端优化',
      title: 'Ai Undress Mobile Background',
      license: `${baseUrl}/terms`,
    },
    {
      loc: `${baseUrl}/images/undress.png`,
      caption: 'AI脱衣处理示例图片',
      title: 'AI Processing Example',
      license: `${baseUrl}/terms`,
    },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${images.map(image => `
  <url>
    <loc>${baseUrl}/</loc>
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:caption>${image.caption}</image:caption>
      <image:title>${image.title}</image:title>
      <image:license>${image.license}</image:license>
    </image:image>
  </url>`).join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
    },
  })
} 