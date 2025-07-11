'use client'

import { Button } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { ArrowLeft } from 'lucide-react'

export default function AboutHeroSection() {
  const t = useTranslations('about');

  return (
    <section className="relative h-[70vh] bg-gradient-midnight overflow-hidden">
      {/* 背景装饰 - 暧昧色调 */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-20 w-32 h-32 bg-seductive-purple rounded-full blur-xl pulse-seductive"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-seductive-pink rounded-full blur-xl pulse-seductive" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-seductive-red rounded-full blur-xl pulse-seductive" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-seductive-dark-red rounded-full blur-xl pulse-seductive" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-seductive-magenta rounded-full blur-xl pulse-seductive" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* 额外的暗色渐变覆盖 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
      
      {/* 英雄位区域 - 占2/3高度 */}
      <div style={{backgroundImage: 'url(/images/bgLg.webp)'}} className="relative h-full flex flex-col justify-center px-4 z-10 bg-cover bg-center bg-no-repeat">
        {/* 背景蒙层 - 毛玻璃效果 */}
        <div className="absolute inset-0 bg-black/55"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* 主标题 */}
          <h1 className="font-bold text-5xl text-transparent bg-clip-text bg-gradient-passion neon-text-pink mb-6 float-animation">
            {t('title')}
          </h1>
          
          {/* 副标题描述 */}
          <p className="text-xl md:text-1xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
        
        {/* 装饰性粒子 - 暧昧色调 */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-seductive-pink rounded-full opacity-80 float-animation" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/3 right-16 w-1 h-1 bg-seductive-purple rounded-full opacity-60 float-animation" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-seductive-red rounded-full opacity-70 float-animation" style={{animationDelay: '2.1s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-seductive-dark-red rounded-full opacity-60 float-animation" style={{animationDelay: '1.8s'}}></div>
        <div className="absolute top-2/3 left-20 w-1 h-1 bg-seductive-wine rounded-full opacity-50 float-animation" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-1/5 right-1/3 w-2 h-2 bg-seductive-magenta rounded-full opacity-75 float-animation" style={{animationDelay: '2.5s'}}></div>
      </div>

    </section>
  )
} 