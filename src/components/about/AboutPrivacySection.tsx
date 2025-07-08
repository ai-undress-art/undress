'use client'

import { Card, CardBody } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { Shield, Check } from 'lucide-react'

export default function AboutPrivacySection() {
  const t = useTranslations('about');

  const features = t.raw('privacy.features') as string[];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-dark-primary via-dark-secondary to-dark-primary relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-seductive-purple/30 rounded-full blur-3xl pulse-seductive"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-seductive-red/25 rounded-full blur-3xl pulse-seductive" style={{animationDelay: '1.2s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Shield size={48} className="text-seductive-pink mr-4" />
            <h2 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-passion neon-text-pink">
              {t('privacy.title')}
            </h2>
          </div>
          <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
            {t('privacy.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="glass-effect-dark border border-seductive-purple/30 shadow-glass-dark hover:neon-border-pink transition-all duration-300"
            >
              <CardBody className="p-6">
                <div className="flex items-center">
                  <div className="bg-seductive-green/20 rounded-full p-2 mr-4 flex-shrink-0">
                    <Check size={20} className="text-seductive-green" />
                  </div>
                  <p className="text-white/90 leading-relaxed">
                    {feature}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 