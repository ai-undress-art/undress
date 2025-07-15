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
        ...otherLocales.reduce((acc, l) => {
          acc[l] = `${BASE_URL}/${l}`;
          return acc;
        }, {} as Record<string, string>),
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
      icon: '/images/logo.png', // 建议使用SVG或高质量PNG
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

        {/* DNS预解析和预连接 */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* 性能优化 */}
        <link rel="preload" href="/images/bgLg.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/bgSm.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/logo.png" as="image" type="image/png" />

      </head>
      <body className='antialiased'>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <GoogleAnalyticsProvider />
            <LanguageDetector />
            <ClientVConsole />
            <Script 
              src="https://crxcr1.com/popin/latest/popin-min.js"
              strategy="afterInteractive"
              data-cfasync="false"
              async
            />
            <Script
              src="//wreckbargaininghers.com/cd/94/09/cd9409a7bfa198d88390178a92033181.js"
              strategy="afterInteractive"
              data-cfasync="false"
              async
            />
            <Script
              src="//wreckbargaininghers.com/0f7dde16e901c333cf6f249cdd8e53c6/invoke.js"
              strategy="afterInteractive"
              data-cfasync="false"
              async
            />
            <Script id="popin-init" strategy="afterInteractive">
              {`  var crakPopInParamsIframe = {
    url: '//widget-ext.crxcr1.com/?landing_id=%7Boffer_url_id%7D&genders=f&providersId=673%2C169&skin=3&containerAlignment=center&cols=0&rows=0&number=50&background=transparent&useFeed=1&animateFeed=1&smoothAnimation=1&ratio=1&verticalSpace=10px&horizontalSpace=10px&colorFilter=0&colorFilterStrength=0&AuxiliaryCSS=%0A&lang=en&refererFile=im%2Fjs.ejs&thumbsBorderBottom=58px&thumbsBorderColor=%23343537&fontSize=15px&infoTopLeftContent=name&infoTopRightContent=gender%2Cage&infoBottomLeftContent=-&infoBottomRightContent=room_subject&infoTopWritePos=after&infoTopPos=inside&infoTopBackgroundColor=rgba(0%2C%200%2C%200%2C%20.65)&infoTopTextColor=%23ff4764&infoTopHeight=30px&infoBottomWritePos=after&infoBottomPos=inside&infoBottomBackgroundColor=rgba(0%2C%200%2C%200%2C%20.65)&infoBottomTextColor=%23c5cad4&infoBottomHeight=30px&infoBottomLineHeight=30px&CTAContent=Join%20Chat%20Room&CTABottom=10px&CTABackground=%23ff4764&CTAColor=%23fff&CTAWidth=calc(100%25%20-%2020px)&CTAHeight=38px&CTAFontSize=16px&CTAFontWeight=700&CTABorderRadius=3px&targetResponsiveWidth=350&cardsBorderRadius=0px&token=8b729f60-5ce0-11f0-ac26-7f87dd95b431&api_key=55ca404f309a2ae836592ff2e374d62b3a0db349cfd2d45bd9050dfa6bff269e',
    decryptUrl: false,
    contentUrl: '',
    decryptContentUrl: false,
    contentType: 'iframe',
    cookieToken: '-520753173',
    width: 'calc(6vw + 240px)',
    height: 'calc((6vw + 240px) * 1  * 1)',
    timeout: 1000,
    delayClose: 0,
    clickStart: false,
    closeIntent: false,
    closeButtonColor: 'rgba(0, 0, 0, .65)',
    closeButtonXOffset: '10px',
    closeButtonYOffset: '0px',
    closeButtonBorderRadius: '5px 5px 0px 0px',
    closeCrossColor: '#fff',
    shadow: false,
    shadowColor: '#000',
    shadowOpacity: '0',
    shadeColor: '#000',
    shadeOpacity: '0',
    border: '0',
    borderColor: 'transparent',
    borderRadius: '0px',
    leadOut: false,
    allowScrollbars: false,
    animation: 'slide',
    direction: 'up',
    verticalPosition: 'bottom',
    horizontalPosition: 'right',
    expireDays: 0,
  };console.log('crakPopInParamsIframe',crakPopInParamsIframe)`}
            </Script>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 