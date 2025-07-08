'use client'

import { Card, CardBody } from '@heroui/react'
import { useTranslations } from 'next-intl'

export default function AboutTechnologySection() {
  const t = useTranslations('about');

  const features = [
    {
      icon: '🧠',
      title: t('technology.features.0.title'),
      description: t('technology.features.0.description')
    },
    {
      icon: '⚡',
      title: t('technology.features.1.title'),
      description: t('technology.features.1.description')
    },
    {
      icon: '💎',
      title: t('technology.features.2.title'),
      description: t('technology.features.2.description')
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-midnight relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 w-40 h-40 bg-seductive-purple/30 rounded-full blur-3xl pulse-seductive"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-seductive-dark-red/40 rounded-full blur-3xl pulse-seductive" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-seductive-magenta/35 rounded-full blur-3xl pulse-seductive" style={{animationDelay: '0.8s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-passion neon-text-pink mb-6">
            {t('technology.title')}
          </h2>
          <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
            {t('technology.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="glass-effect-dark border border-seductive-purple/30 shadow-glass-dark hover:neon-border-pink transition-all duration-300 group"
            >
              <CardBody className="p-8 text-center">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-seductive mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 