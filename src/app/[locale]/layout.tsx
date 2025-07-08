import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import PerformanceMonitor from '@/components/analytics/PerformanceMonitor'
import GoogleAnalyticsProvider from '@/components/analytics/GoogleAnalytics'
import LanguageDetector from '@/components/LanguageDetector'
import Script from 'next/script'


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    robots: 'index, follow',
    authors: [{ name: 'Dessi AI Team' }],
    creator: 'Dessi AI',
    publisher: 'Dessi AI',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://ai-undress.online'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'zh': '/zh',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `/${locale}`,
      siteName: 'Dessi AI',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    icons: {
      icon: '/images/logo.png',
      shortcut: '/images/logo.png',
      apple: '/images/logo.png',
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  // 验证locale是否有效
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // 获取对应语言的翻译文件
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <meta name="6a97888e-site-verification" content="bee01f6bb37c65bc7f6112921b8a7cf0" />
        <meta name="juicyads-site-verification" content="708a3b01853f2ba74b0d50543495e2f2" />

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
      <body className='antialiased'>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <GoogleAnalyticsProvider />
            <LanguageDetector />
            <PerformanceMonitor />
            <Script
              src="https://js.juicyads.com/jp.php?c=4464v213q244u4r2o2e43374a4&u=https%3A%2F%2Fwww.juicyads.rocks"
              strategy="afterInteractive"
            />
            <Script
              src="https://poweredby.jads.co/js/jads.js"
              data-cfasync="false"
              async
              strategy="afterInteractive"
            />

            <Script id="juicyads-init" strategy="afterInteractive">
              {`(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1095758});`}
            </Script>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 