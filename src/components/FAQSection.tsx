'use client'

import { Accordion, AccordionItem } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { StructuredData, createFAQPageSchema } from './seo/StructuredData'

export default function FAQSection() {
  const t = useTranslations('faq');
  
  const faqData = [
    {
      key: "what-is-ai-undress",
      title: t('items.q1'),
      content: t('items.a1')
    },
    {
      key: "how-to-use",
      title: t('items.q2'),
      content: t('items.a2')
    },
    {
      key: "processing-time",
      title: t('items.q3'),
      content: t('items.a3')
    },
    {
      key: "is-free",
      title: t('items.q4'),
      content: t('items.a4')
    },
    {
      key: "is-safe",
      title: t('items.q5'),
      content: t('items.a5')
    },
    {
      key: "data-storage",
      title: t('items.q6'),
      content: t('items.a6')
    },
    {
      key: "privacy",
      title: t('items.q7'),
      content: t('items.a7')
    }
  ]

  // 创建FAQ结构化数据
  const faqSchema = createFAQPageSchema(
    faqData.map(item => ({
      question: item.title,
      answer: item.content
    }))
  )

  return (
    <>
      <StructuredData data={faqSchema} />
      <section className="py-20 px-4 bg-gradient-to-b from-dark-primary via-dark-secondary to-dark-primary relative overflow-hidden">
      {/* 背景装饰 - 暧昧色调 */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-seductive-purple/30 rounded-full blur-3xl pulse-seductive"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-seductive-red/25 rounded-full blur-3xl pulse-seductive" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute top-1/2 left-1/8 w-32 h-32 bg-seductive-magenta/20 rounded-full blur-3xl pulse-seductive" style={{animationDelay: '2.1s'}}></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <h2 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-passion neon-text-pink text-center mb-16">
          {t('title')}
        </h2>
        
        <Accordion variant="splitted" className="gap-6">
          {faqData.map((item) => (
            <AccordionItem
              key={item.key}
              aria-label={item.title}
              title={item.title}
              className="glass-effect-dark border border-seductive-purple/30 rounded-2xl shadow-glass-dark hover:neon-border-pink transition-all duration-300"
              classNames={{
                base: "group-data-[open=true]:neon-border-pink group-data-[open=true]:shadow-neon-pink",
                title: "text-white text-lg font-semibold group-data-[open=true]:text-transparent group-data-[open=true]:bg-clip-text group-data-[open=true]:bg-gradient-passion",
                content: "text-white/85",
                titleWrapper: "flex-1"
              }}
            >
              <div className="text-white/85 leading-relaxed pb-3 px-3">
                {item.content}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
    </>
  )
} 