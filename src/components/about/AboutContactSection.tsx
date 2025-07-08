'use client'

import { Card, CardBody, Button } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { Mail, MessageCircle, Phone } from 'lucide-react'

export default function AboutContactSection() {
  const t = useTranslations('about');

  const contactMethods = [
    {
      icon: <Mail size={32} />,
      title: t('contact.email'),
      description: 'contact@dessi.ai',
      action: 'mailto:contact@dessi.ai'
    },
    {
      icon: <MessageCircle size={32} />,
      title: t('contact.support'),
      description: t('contact.onlineSupport'),
      action: '#'
    },
    {
      icon: <Phone size={32} />,
      title: t('contact.phone'),
      description: '+86 400-123-4567',
      action: 'tel:+864001234567'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-dark-primary via-dark-secondary to-dark-primary relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-seductive-purple/30 rounded-full blur-3xl pulse-seductive"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-seductive-red/25 rounded-full blur-3xl pulse-seductive" style={{animationDelay: '1.2s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-passion neon-text-pink mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactMethods.map((method, index) => (
            <Card 
              key={index}
              className="glass-effect-dark border border-seductive-purple/30 shadow-glass-dark hover:neon-border-pink transition-all duration-300 group"
            >
              <CardBody className="p-8 text-center">
                <div className="text-seductive-pink mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-seductive mb-3">
                  {method.title}
                </h3>
                <p className="text-white/80 mb-4">
                  {method.description}
                </p>
                <Button
                  as="a"
                  href={method.action}
                  variant="bordered"
                  className="border-seductive-purple/40 text-white hover:bg-seductive-purple/10 transition-all duration-300"
                >
                  {t('contact.contactAction')}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* 底部CTA */}
        <div className="text-center">
          <Card className="glass-effect-dark border border-seductive-purple/30 shadow-glass-dark max-w-2xl mx-auto">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-passion mb-4">
                {t('contact.readyTitle')}
              </h3>
              <p className="text-white/80 mb-6">
                {t('contact.readyDescription')}
              </p>
              <Button
                as="a"
                href="/"
                size="lg"
                className="btn-gradient-primary px-12 py-3 text-lg font-bold rounded-full shadow-neon-pink hover:shadow-neon"
              >
                ✨ {t('contact.tryNow')}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
} 