import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import ContactForm from './ContactForm'
import type { Metadata } from 'next'
import { createContactPageSchema, StructuredData } from '@/components/seo/StructuredData'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.contact' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: 'index, follow',
    alternates: {
      canonical: `/${locale}/contact`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `/${locale}/contact`,
      siteName: 'Ai Undress',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  }
}

export default function ContactPage() {
  const t = useTranslations('contact')
  const metaT = useTranslations('metadata.contact')

  // 结构化数据
  const contactPageSchema = createContactPageSchema(
    t('title'),
    metaT('description'),
    typeof window !== 'undefined' ? window.location.href : ''
  );

  return (
    <>
      <StructuredData data={contactPageSchema} />

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
              {t('breadcrumb.contact')}
            </li>
          </ol>
        </nav>

        {/* 英雄位区域 */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-20 left-20 w-32 h-32 bg-seductive-purple rounded-full blur-xl pulse-seductive"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-seductive-pink rounded-full blur-xl pulse-seductive" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-seductive-red rounded-full blur-xl pulse-seductive" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-seductive-dark-red rounded-full blur-xl pulse-seductive" style={{ animationDelay: '0.5s' }}></div>
          </div>

          {/* 背景渐变覆盖 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>

          {/* 背景图片 */}
          <div
            style={{ backgroundImage: 'url(/images/bgLg.webp)' }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          >
            <div className="absolute inset-0 bg-black/55"></div>
          </div>

          {/* 英雄位内容 */}
          <div className="relative h-full flex flex-col justify-center px-4 z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-bold text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-passion neon-text-pink mb-6 float-animation">
                {t('heroTitle')}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed">
                {t('heroDescription')}
              </p>

              <p className="text-lg text-seductive-pink font-semibold">
                {t('heroSubtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* 主要内容区域 */}
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* 返回按钮 */}
            <Link
              href="/"
              className="inline-flex items-center text-seductive-purple hover:text-seductive-pink transition-colors mb-12"
              aria-label={t('backToHome')}
            >
              ← {t('backToHome')}
            </Link>

            {/* 第二行：联系表单 */}
            <div>
              <ContactForm />
            </div>
            <div className="space-y-12 mt-10">
              {/* 第一行：联系信息和支持类型 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 联系信息 */}
                <div className="bg-black/30 border border-white/10 backdrop-blur-sm rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-passion mb-6">
                    {t('info.title')}
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-seductive-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-seductive-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {t('info.email.title')}
                        </h3>
                        <p className="text-seductive-purple font-medium">
                          {t('info.email.address')}
                        </p>
                        <p className="text-white/60 text-sm">
                          {t('info.email.description')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-seductive-pink/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-seductive-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {t('info.response.title')}
                        </h3>
                        <p className="text-seductive-pink font-medium">
                          {t('info.response.time')}
                        </p>
                        <p className="text-white/60 text-sm">
                          {t('info.response.description')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-seductive-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-seductive-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.196l1.216 2.468a1 1 0 00.748.546l2.725.396-1.973 1.925a1 1 0 00-.287.885l.465 2.717-2.438-1.283a1 1 0 00-.932 0L9.087 11.133l.465-2.717a1 1 0 00-.287-.885L7.292 5.606l2.725-.396a1 1 0 00.748-.546L12 2.196z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {t('info.support.title')}
                        </h3>
                        <p className="text-seductive-red font-medium">
                          {t('info.support.availability')}
                        </p>
                        <p className="text-white/60 text-sm">
                          {t('info.support.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 支持类型 */}
                <div className="bg-black/30 border border-white/10 backdrop-blur-sm rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-passion mb-6">
                    {t('types.title')}
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-seductive-purple rounded-full"></div>
                      <div>
                        <h3 className="text-white font-medium">{t('types.technical.title')}</h3>
                        <p className="text-white/60 text-sm">{t('types.technical.description')}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-seductive-pink rounded-full"></div>
                      <div>
                        <h3 className="text-white font-medium">{t('types.feedback.title')}</h3>
                        <p className="text-white/60 text-sm">{t('types.feedback.description')}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-seductive-red rounded-full"></div>
                      <div>
                        <h3 className="text-white font-medium">{t('types.business.title')}</h3>
                        <p className="text-white/60 text-sm">{t('types.business.description')}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-seductive-dark-red rounded-full"></div>
                      <div>
                        <h3 className="text-white font-medium">{t('types.general.title')}</h3>
                        <p className="text-white/60 text-sm">{t('types.general.description')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  )
} 