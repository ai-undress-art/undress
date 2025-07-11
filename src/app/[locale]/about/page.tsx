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
import { createAboutPageSchema, createBreadcrumbSchema, StructuredData } from '@/components/seo/StructuredData'


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
  
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: t('breadcrumb.home'), url: `/${locale}` },
    { name: t('breadcrumb.about'), url: `/${locale}/about` }
  ]);

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
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
  const aboutPageSchema = createAboutPageSchema(
    metaT('title'),
    metaT('description'),
    `/${locale}/about`
  );

  return (
    <>
      <StructuredData data={aboutPageSchema} />
      
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