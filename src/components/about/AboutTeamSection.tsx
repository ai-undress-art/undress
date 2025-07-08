'use client'

import { Card, CardBody } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { Users } from 'lucide-react'

export default function AboutTeamSection() {
  const t = useTranslations('about');

  return (
    <section className="py-20 px-4 bg-gradient-midnight relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 w-40 h-40 bg-seductive-purple/30 rounded-full blur-3xl pulse-seductive"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-seductive-dark-red/40 rounded-full blur-3xl pulse-seductive" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Users size={48} className="text-seductive-pink mr-4" />
            <h2 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-passion neon-text-pink">
              {t('team.title')}
            </h2>
          </div>
        </div>

        <div className="flex justify-center">
          <Card className="glass-effect-dark border border-seductive-purple/30 shadow-glass-dark hover:neon-border-pink transition-all duration-300 max-w-4xl">
            <CardBody className="p-12">
              <div className="text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">👨‍💻</div>
                    <p className="text-white/70 text-sm">AI 研究专家</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚙️</div>
                    <p className="text-white/70 text-sm">软件工程师</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎨</div>
                    <p className="text-white/70 text-sm">产品设计师</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔬</div>
                    <p className="text-white/70 text-sm">技术专家</p>
                  </div>
                </div>
                
                <p className="text-white/90 text-xl leading-relaxed">
                  {t('team.description')}
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
} 