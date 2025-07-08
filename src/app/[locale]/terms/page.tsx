import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.terms' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: 'index, follow',
    alternates: {
      canonical: `/${locale}/terms`,
      languages: {
        'en': '/en/terms',
        'zh': '/zh/terms',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `/${locale}/terms`,
      siteName: 'Dessi AI',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  }
}

export default function TermsPage() {
  const t = useTranslations('terms')
  const metaT = useTranslations('metadata.terms')

  // 结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('title'),
    "description": metaT('description'),
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": t('breadcrumb.home'),
          "item": "/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": t('breadcrumb.terms'),
          "item": "/terms"
        }
      ]
    },
    "mainEntity": {
      "@type": "TermsOfService",
      "name": t('title'),
      "description": metaT('description'),
      "dateModified": "2024-01-15",
      "publisher": {
        "@type": "Organization",
        "name": "Dessi AI",
        "url": "https://ai-undress.online"
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-midnight text-white">
        {/* 面包屑导航 */}
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
              {t('breadcrumb.terms')}
            </li>
          </ol>
        </nav>

        {/* 页面内容 */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* 返回按钮 */}
            <Link 
              href="/"
              className="inline-flex items-center text-seductive-purple hover:text-seductive-pink transition-colors mb-8"
              aria-label={t('backToHome')}
            >
              ← {t('backToHome')}
            </Link>

            {/* 页面标题 */}
            <header className="mb-12">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-passion mb-4">
                {t('title')}
              </h1>
              
              {/* 最后更新时间 */}
              <p className="text-white/60">
                <time dateTime="2024-01-15">
                  {t('lastUpdated')}: {t('updateDate')}
                </time>
              </p>
            </header>

            {/* 服务条款内容 */}
            <article className="prose prose-invert max-w-none">
              
              {/* 条款接受 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('acceptance.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('acceptance.content')}
                </p>
              </section>

              {/* 服务描述 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('serviceDescription.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('serviceDescription.content')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>{t('serviceDescription.items.processing')}</li>
                  <li>{t('serviceDescription.items.generation')}</li>
                  <li>{t('serviceDescription.items.analysis')}</li>
                  <li>{t('serviceDescription.items.api')}</li>
                </ul>
              </section>

              {/* 用户责任 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('userResponsibilities.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('userResponsibilities.description')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>{t('userResponsibilities.items.lawful')}</li>
                  <li>{t('userResponsibilities.items.consent')}</li>
                  <li>{t('userResponsibilities.items.respect')}</li>
                  <li>{t('userResponsibilities.items.noHarm')}</li>
                  <li>{t('userResponsibilities.items.compliance')}</li>
                  <li>{t('userResponsibilities.items.accurate')}</li>
                </ul>
              </section>

              {/* 禁止使用 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('prohibitedUse.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('prohibitedUse.description')}
                </p>
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-4">
                  <ul className="list-disc list-inside space-y-2 text-white/90">
                    <li>{t('prohibitedUse.items.illegal')}</li>
                    <li>{t('prohibitedUse.items.harassment')}</li>
                    <li>{t('prohibitedUse.items.minors')}</li>
                    <li>{t('prohibitedUse.items.copyright')}</li>
                    <li>{t('prohibitedUse.items.malware')}</li>
                    <li>{t('prohibitedUse.items.spam')}</li>
                  </ul>
                </div>
              </section>

              {/* 知识产权 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('intellectualProperty.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('intellectualProperty.description')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>{t('intellectualProperty.items.ownership')}</li>
                  <li>{t('intellectualProperty.items.license')}</li>
                  <li>{t('intellectualProperty.items.userContent')}</li>
                  <li>{t('intellectualProperty.items.generated')}</li>
                </ul>
              </section>

              {/* 服务可用性 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('serviceAvailability.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('serviceAvailability.description')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>{t('serviceAvailability.items.uptime')}</li>
                  <li>{t('serviceAvailability.items.maintenance')}</li>
                  <li>{t('serviceAvailability.items.interruption')}</li>
                  <li>{t('serviceAvailability.items.modification')}</li>
                </ul>
              </section>

              {/* 数据和隐私 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('dataAndPrivacy.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('dataAndPrivacy.description')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>{t('dataAndPrivacy.items.processing')}</li>
                  <li>{t('dataAndPrivacy.items.retention')}</li>
                  <li>{t('dataAndPrivacy.items.security')}</li>
                  <li>{t('dataAndPrivacy.items.sharing')}</li>
                </ul>
                <div className="bg-seductive-purple/20 border border-seductive-purple/30 rounded-lg p-4 mt-4">
                  <p className="text-white/90 text-sm">
                    💡 {t('dataAndPrivacy.privacyNote')}
                    <Link href="/privacy" className="text-seductive-pink hover:text-seductive-purple transition-colors ml-1">
                      {t('dataAndPrivacy.privacyLink')}
                    </Link>
                  </p>
                </div>
              </section>

              {/* 责任限制 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('limitation.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('limitation.description')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>{t('limitation.items.asIs')}</li>
                  <li>{t('limitation.items.damages')}</li>
                  <li>{t('limitation.items.liability')}</li>
                  <li>{t('limitation.items.force')}</li>
                </ul>
              </section>

              {/* 终止 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('termination.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('termination.description')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>{t('termination.items.userTermination')}</li>
                  <li>{t('termination.items.ourTermination')}</li>
                  <li>{t('termination.items.effect')}</li>
                  <li>{t('termination.items.survival')}</li>
                </ul>
              </section>

              {/* 适用法律 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('governing.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('governing.description')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>{t('governing.items.jurisdiction')}</li>
                  <li>{t('governing.items.disputes')}</li>
                  <li>{t('governing.items.court')}</li>
                  <li>{t('governing.items.language')}</li>
                </ul>
              </section>

              {/* 联系我们 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('contact.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('contact.description')}
                </p>
                <address className="bg-black/30 border border-white/10 rounded-lg p-6 not-italic">
                  <p className="text-white/90">
                    <strong>{t('contact.email')}:</strong> 
                    <a href="mailto:undress.online.ai@gmail.com" className="text-seductive-purple hover:text-seductive-pink transition-colors ml-1">
                      undress.online.ai@gmail.com
                    </a>
                  </p>
                  <p className="text-white/90 mt-2">
                    <strong>{t('contact.support')}:</strong> 
                    <a href="mailto:undress.online.ai@gmail.com" className="text-seductive-purple hover:text-seductive-pink transition-colors ml-1">
                      undress.online.ai@gmail.com
                    </a>
                  </p>
                </address>
              </section>

              {/* 条款更新 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('updates.title')}
                </h2>
                <p className="text-white/80 leading-relaxed">
                  {t('updates.description')}
                </p>
              </section>

            </article>
          </div>
        </main>
      </div>
    </>
  )
} 