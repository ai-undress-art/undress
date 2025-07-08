'use client'

import { Card, CardBody } from '@heroui/react'
import { useTranslations } from 'next-intl'

export default function AboutMissionSection() {
  const t = useTranslations('about');

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-dark-primary via-dark-secondary to-dark-primary relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-seductive-purple/30 rounded-full blur-3xl pulse-seductive"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-seductive-red/25 rounded-full blur-3xl pulse-seductive" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-passion neon-text-pink mb-6">
            {t('mission.title')}
          </h2>
        </div>

        <div className="flex justify-center">
          <Card className="glass-effect-dark border border-seductive-purple/30 shadow-glass-dark hover:neon-border-pink transition-all duration-300 max-w-4xl">
            <CardBody className="p-12">
              <div className="text-center">
                <div className="text-6xl mb-8 opacity-80">🎯</div>
                <p className="text-white/90 text-xl leading-relaxed">
                  {t('mission.description')}
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
} 