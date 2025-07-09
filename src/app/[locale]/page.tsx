import AppNavbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import UploadSection from '@/components/UploadSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

// This metadata is now handled by the root layout, so this can be removed.
// export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
//   const { locale } = await params;
//   const t = await getTranslations({ locale, namespace: 'metadata' });
  
//   return {
//     title: t('title'),
//     description: t('description'),
//     robots: 'index, follow',
//     alternates: {
//       canonical: `/${locale}`,
//       languages: {
//         'en': '/en',
//         'zh': '/zh',
//       },
//     },
//     openGraph: {
//       title: t('title'),
//       description: t('description'),
//       type: 'website',
//       locale: locale,
//       url: `/${locale}`,
//       siteName: 'Ai Undress',
//       images: [
//         {
//           url: '/images/logo.png',
//           width: 1200,
//           height: 630,
//           alt: 'Ai Undress Logo',
//         },
//       ],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: t('title'),
//       description: t('description'),
//       images: ['/images/logo.png'],
//     },
//   }
// }

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // 网站结构化数据
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ai Undress",
    "url": BASE_URL,
    "description": t('description'),
    // potentialAction can be added back when a search feature is implemented
    // "potentialAction": {
    //   "@type": "SearchAction",
    //   "target": `${BASE_URL}/search?q={search_term_string}`,
    //   "query-input": "required name=search_term_string"
    // }
  }

  // 软件应用结构化数据
  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Ai Undress",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "description": t('description'),
    "url": BASE_URL,
    "author": {
      "@type": "Organization",
      "name": "Ai Undress"
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
        {/* <FAQSection /> */}
        <Footer />
      </main>
    </>
  )
} 