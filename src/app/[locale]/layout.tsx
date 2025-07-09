import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import GoogleAnalyticsProvider from '@/components/analytics/GoogleAnalytics'
import LanguageDetector from '@/components/LanguageDetector'
import Script from 'next/script'
import ClientVConsole from '@/components/analytics/ClientVConsole'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const otherLocales = routing.locales.filter((l) => l !== locale);

  return {
    title: t('title'),
    description: t('description'),
    robots: 'index, follow',
    authors: [{ name: 'Ai Undress Team' }],
    creator: 'Ai Undress',
    publisher: 'Ai Undress',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': `${BASE_URL}/en`,
        'zh': `${BASE_URL}/zh`,
        'x-default': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `${BASE_URL}/${locale}`,
      siteName: t('title'),
      images: [
        {
          url: `${BASE_URL}/images/og-image.png`, // 推荐使用专门的OG图片
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${BASE_URL}/images/og-image.png`], // Twitter也使用此图片
    },
    icons: {
      icon: '/images/logo.svg', // 建议使用SVG或高质量PNG
      shortcut: '/images/logo.svg',
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
        {/* <script type='text/javascript' src='//pl27113709.profitableratecpm.com/cd/94/09/cd9409a7bfa198d88390178a92033181.js'></script> */}

        {/* DNS预解析和预连接 */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

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
              "name": "Ai Undress", // 可替换为品牌名
              "url": BASE_URL,
              "logo": `${BASE_URL}/images/logo.png`,
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
                // "https://twitter.com/YourProfile",
                // "https://github.com/YourProfile"
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
            <ClientVConsole />
            {/* <Script
              src="//pl27113709.profitableratecpm.com/cd/94/09/cd9409a7bfa198d88390178a92033181.js"
              data-cfasync="false"
              async
              strategy="afterInteractive"
            /> */}
            {/* <Script 
              src="//static.scptpz.com/mnpw3.js"
              strategy="afterInteractive"
              data-cfasync="false"
              async
            /> */}
            <Script
              src="https://poweredby.jads.co/js/jads.js"
              data-cfasync="false"
              async
              strategy="afterInteractive"
            />
            <Script id="juicyads-init" strategy="afterInteractive">
              {`(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1095758},{'adzone':1095776},{'adzone':1095778});`}
            </Script>
            {/* <Script strategy="afterInteractive">
              {`setTimeout(() => {
                console.log('mnpw',mnpw);
                mnpw.add('https://t.ancdu.link/380687/3785/0?bo=Array&target=pops&file_id=252177&po=6456&aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0005&pud=scptpz', {newTab: true, cookieExpires: 86401});
              }, 2000)`}
            </Script> */}
            <Script
              src="https://js.juicyads.com/jp.php?c=4464v213q244u4r2o2e43374a4&u=https%3A%2F%2Fwww.juicyads.rocks"
              strategy="lazyOnload"
            />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 