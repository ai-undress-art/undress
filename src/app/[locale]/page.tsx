import AppNavbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import UploadSection from '@/components/UploadSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    robots: 'index, follow',
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
      images: [
        {
          url: '/images/logo.png',
          width: 1200,
          height: 630,
          alt: 'Dessi AI Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/logo.png'],
    },
  }
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  // 网站结构化数据
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dessi AI",
    "url": "https://ai-undress.online",
    "description": t('description'),
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ai-undress.online/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  // 软件应用结构化数据
  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Dessi AI",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "description": t('description'),
    "url": "https://ai-undress.online",
    "author": {
      "@type": "Organization",
      "name": "Dessi AI"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />
      
      <main className="min-h-screen">
        <AppNavbar />
        <HeroSection />
        <UploadSection />
        <FAQSection />
        <Footer />
      </main>
    </>
  )
} 