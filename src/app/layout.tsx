import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-undress.online'),
  title: {
    template: '%s | Dessi AI',
    default: 'Dessi AI - 免费AI脱衣工具 | 先进的AI图像处理技术'
  },
  description: '使用最先进的AI技术进行图像处理，支持多种格式，24小时自动删除，保护隐私安全。免费使用，无限制。',
  keywords: ['AI图像处理', '人工智能', '图像编辑', '深度学习', '计算机视觉', 'AI工具', '免费AI'],
  authors: [{ name: 'Dessi AI Team', url: 'https://ai-undress.online' }],
  creator: 'Dessi AI',
  publisher: 'Dessi AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://ai-undress.online',
    siteName: 'Dessi AI',
    title: 'Dessi AI - 免费AI脱衣工具 | 先进的AI图像处理技术',
    description: '使用最先进的AI技术进行图像处理，支持多种格式，24小时自动删除，保护隐私安全。',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Dessi AI - AI图像处理工具',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dessi AI - 免费AI脱衣工具',
    description: '使用最先进的AI技术进行图像处理，免费使用，保护隐私。',
    images: ['/images/logo.png'],
    creator: '@DessiiAI',
    site: '@DessiiAI',
  },
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/images/logo.png',
    apple: [
      { url: '/images/logo.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  manifest: '/manifest.webmanifest',
  category: 'technology',
  classification: 'AI Image Processing',
  referrer: 'origin-when-cross-origin',
  verification: {
    // 添加搜索引擎验证码（需要时填入）
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  other: {
    'msapplication-TileColor': '#8b5cf6',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* DNS预解析和预连接 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* 安全性头部 */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self';" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* 性能优化 */}
        <link rel="preload" href="/images/bgLg.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/logo.png" as="image" type="image/png" />
        
        {/* 结构化数据 - 组织信息 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Dessi AI",
              "url": "https://ai-undress.online",
              "logo": "https://ai-undress.online/images/logo.png",
              "description": "先进的AI图像处理技术公司",
              "foundingDate": "2024",
              "industry": "Artificial Intelligence",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "undress.online.ai@gmail.com",
                "availableLanguage": ["Chinese", "English"]
              },
              "sameAs": [
                "https://twitter.com/DessiiAI",
                "https://github.com/dessi-ai"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
} 