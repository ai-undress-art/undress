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
      <section className="py-20 px-4  via-dark-secondary relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto">
          <h2 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-passion neon-text-pink text-center mb-16">
            {t('title')}
          </h2>

          <Accordion className="gap-6">
            {faqData.map((item) => (
              <AccordionItem
                key={item.key}
                aria-label={item.title}
                title={item.title}
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