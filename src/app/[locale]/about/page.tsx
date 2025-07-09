import AppNavbar from '@/components/Navbar'
import AboutHeroSection from '@/components/about/AboutHeroSection'
import AboutMissionSection from '@/components/about/AboutMissionSection'
import AboutTechnologySection from '@/components/about/AboutTechnologySection'
import AboutPrivacySection from '@/components/about/AboutPrivacySection'
import AboutTeamSection from '@/components/about/AboutTeamSection'
import Footer from '@/components/Footer'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.about' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: 'index, follow',
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        'en': '/en/about',
        'zh': '/zh/about',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `/${locale}/about`,
      siteName: 'Ai Undress',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  }
}

// 面包屑导航组件
function BreadcrumbNav({ locale }: { locale: string }) {
  const t = useTranslations('about')
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t('breadcrumb.home'),
        "item": `/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('breadcrumb.about'),
        "item": `/${locale}/about`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="container mx-auto px-4 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-white/60">
          <li>
            <Link 
              href="/"
              className="hover:text-seductive-purple transition-colors"
              aria-label={t('breadcrumb.home')}
            >
              {t('breadcrumb.home')}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-white/80" aria-current="page">
            {t('breadcrumb.about')}
          </li>
        </ol>
      </nav>
    </>
  )
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const metaT = await getTranslations({ locale, namespace: 'metadata.about' });

  // 组织结构化数据
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ai Undress",
    "url": "https://ai-undress.online",
    "description": metaT('description'),
    "foundingDate": "2024",
    "industry": "Artificial Intelligence",
    "specialties": [
      "AI Image Processing",
      "Deep Learning",
      "Computer Vision",
      "Machine Learning"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "undress.online.ai@gmail.com"
    }
  }

  // 网页结构化数据
  const webPageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('title'),
    "description": metaT('description'),
    "url": `/${locale}/about`,
    "mainEntity": {
      "@type": "AboutPage",
      "name": t('title'),
      "description": metaT('description')
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageData) }}
      />
      
      <main className="min-h-screen">
        <AppNavbar />
        <BreadcrumbNav locale={locale} />
        <AboutHeroSection />
        <AboutMissionSection />
        <AboutTechnologySection />
        <AboutPrivacySection />
        <AboutTeamSection />
        <Footer />
      </main>
    </>
  )
} 