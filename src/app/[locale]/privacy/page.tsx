import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.privacy' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: 'index, follow',
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        'en': '/en/privacy',
        'zh': '/zh/privacy',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `/${locale}/privacy`,
      siteName: 'Dessi AI',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  }
}

export default function PrivacyPage() {
  const t = useTranslations('privacy')
  const metaT = useTranslations('metadata.privacy')

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
          "name": t('breadcrumb.privacy'),
          "item": "/privacy"
        }
      ]
    },
    "mainEntity": {
      "@type": "PrivacyPolicy",
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
              {t('breadcrumb.privacy')}
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

            {/* 隐私政策内容 */}
            <article className="prose prose-invert max-w-none">
              
              {/* 简介 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('introduction.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('introduction.content')}
                </p>
              </section>

              {/* 信息收集 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('dataCollection.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('dataCollection.description')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>{t('dataCollection.items.uploaded')}</li>
                  <li>{t('dataCollection.items.technical')}</li>
                  <li>{t('dataCollection.items.usage')}</li>
                  <li>{t('dataCollection.items.device')}</li>
                </ul>
              </section>

              {/* 信息使用 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('dataUsage.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('dataUsage.description')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>{t('dataUsage.items.processing')}</li>
                  <li>{t('dataUsage.items.improvement')}</li>
                  <li>{t('dataUsage.items.support')}</li>
                  <li>{t('dataUsage.items.security')}</li>
                </ul>
              </section>

              {/* 数据保护 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('dataProtection.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('dataProtection.description')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>{t('dataProtection.items.encryption')}</li>
                  <li>{t('dataProtection.items.autoDelete')}</li>
                  <li>{t('dataProtection.items.accessControl')}</li>
                  <li>{t('dataProtection.items.monitoring')}</li>
                </ul>
              </section>

              {/* 数据共享 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('dataSharing.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('dataSharing.description')}
                </p>
                <div className="bg-seductive-purple/20 border border-seductive-purple/30 rounded-lg p-6" role="note">
                  <p className="text-white/90 font-medium">
                    {t('dataSharing.noSharing')}
                  </p>
                </div>
              </section>

              {/* Cookie政策 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('cookies.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('cookies.description')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>{t('cookies.items.essential')}</li>
                  <li>{t('cookies.items.analytics')}</li>
                  <li>{t('cookies.items.preferences')}</li>
                </ul>
              </section>

              {/* 用户权利 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-seductive-pink mb-4">
                  {t('userRights.title')}
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {t('userRights.description')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>{t('userRights.items.access')}</li>
                  <li>{t('userRights.items.correction')}</li>
                  <li>{t('userRights.items.deletion')}</li>
                  <li>{t('userRights.items.objection')}</li>
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

              {/* 政策更新 */}
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