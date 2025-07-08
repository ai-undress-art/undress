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
    default: 'Dessi AI - AI Image Processing Tool | Advanced AI Technology'
  },
  description: 'Advanced AI technology for image processing, supporting multiple formats, 24-hour automatic deletion, privacy protection. Free to use, no restrictions.',
  keywords: ['AI image processing', 'artificial intelligence', 'image editing', 'deep learning', 'computer vision', 'AI tools', 'free AI'],
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
    locale: 'en_US',
    url: 'https://ai-undress.online',
    siteName: 'Dessi AI',
    title: 'Dessi AI - AI Image Processing Tool | Advanced AI Technology',
    description: 'Advanced AI technology for image processing, supporting multiple formats, 24-hour automatic deletion, privacy protection.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Dessi AI - AI Image Processing Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dessi AI - AI Image Processing Tool',
    description: 'Advanced AI technology for image processing, free to use, privacy protection.',
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
    <html>
      <head>
        <meta name="6a97888e-site-verification" content="bee01f6bb37c65bc7f6112921b8a7cf0" />
        {/* DNS预解析和预连接 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://poweredby.jads.co" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://poweredby.jads.co" />
        <link rel="dns-prefetch" href="https://cdn.jads.co" />
        <link rel="dns-prefetch" href="https://ads.jads.co" />
        <meta name="juicyads-site-verification" content="708a3b01853f2ba74b0d50543495e2f2"></meta>
        {/* 安全性头部现在在 next.config.js 中配置 */}

        {/* 性能优化 */}
        <link rel="preload" href="/images/bgLg.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/logo.png" as="image" type="image/png" />



        {/* JuicyAds 脚本将在页面加载完成后动态加载 */}

        <script type="text/javascript" src="https://js.juicyads.com/jp.php?c=4464v213q244u4r2o2e43374a4&u=https%3A%2F%2Fwww.juicyads.rocks"></script>



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
              "description": "Advanced AI image processing technology company",
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
        
        {/* JuicyAds 脚本在页面底部加载 */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                  return; // 开发环境不加载广告
                }
                
                function loadJuicyAds() {
                  if (document.querySelector('script[src*="poweredby.jads.co"]')) {
                    return; // 已经加载过了
                  }
                  
                  // 确保 window 对象准备好
                  window.adsbyjuicy = window.adsbyjuicy || {};
                  
                  var script = document.createElement('script');
                  script.type = 'text/javascript';
                  script.src = 'https://poweredby.jads.co/js/jads.js';
                  script.async = true;
                  script.setAttribute('data-cfasync', 'false');
                  
                  script.onerror = function(error) {
                    console.warn('JuicyAds script failed to load:', error);
                  };
                  
                  script.onload = function() {
                    console.log('JuicyAds script loaded successfully');
                  };
                  
                  document.body.appendChild(script);
                }
                
                // 延迟加载
                if (document.readyState === 'complete') {
                  setTimeout(loadJuicyAds, 2000);
                } else {
                  window.addEventListener('load', function() {
                    setTimeout(loadJuicyAds, 2000);
                  });
                }
              })();
            `
          }}
        />
      </body>
    </html>
  )
} 