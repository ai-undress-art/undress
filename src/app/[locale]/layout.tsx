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

const inter = Inter({ subsets: ['latin'] })

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={`${inter.className} bg-dark-primary text-white`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <GoogleAnalyticsProvider />
            <LanguageDetector />
            <PerformanceMonitor />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 