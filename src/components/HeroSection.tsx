'use client'

import { Button } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { useWindowSize } from '@/hooks/useWindowSize'
import Image from 'next/image'

export default function HeroSection() {
  const t = useTranslations('hero');
  const { width } = useWindowSize();

  const handleCreateClick = () => {
    // 滚动到上传区域
    const uploadSection = document.getElementById('upload-section')
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-[calc(100vh-64px)] overflow-hidden">


      {/* 额外的暗色渐变覆盖 */}
      <div className="absolute inset-0 via-transparent to-black/40"></div>

      {/* 英雄位区域 - 占2/3高度 */}
      <div className="relative h-2/3 flex flex-col justify-center px-4 z-10">


      {/* 背景图片 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bgLg.webp"
          alt="AI Image Processing Background"
          fill
          style={{ objectFit: 'cover' }}
          className="hidden lg:block" // 仅在 lg 及以上尺寸显示
          priority // 优先加载
        />
        <Image
          src="/images/bgSm.webp"
          alt="AI Image Processing Background"
          fill
          style={{ objectFit: 'cover' }}
          className="block lg:hidden" // 在 lg 以下尺寸显示
          priority // 优先加载
        />
      </div>

        {/* 背景蒙层 - 毛玻璃效果 */}
        <div className="absolute inset-0 bg-black/55"></div>

        <div className="w-full mx-auto text-center relative z-10">
          {/* 主标题 */}
          <h1 className="font-bold text-5xl text-transparent bg-clip-text bg-gradient-passion mb-6 float-animation lg:neon-text-pink">
            {t('title')}
          </h1>

          {/* 副标题描述 */}
          <p className="text-xl md:text-1xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* 主要操作按钮 */}
          <Button
            size="lg"
            className="btn-gradient-primary px-16 py-4 text-xl font-bold rounded-full mx-auto hover:shadow-neon lg:shadow-neon-pink"
            onClick={handleCreateClick}
          >
            ✨ {t('cta')}
          </Button>
        </div>

      </div>

      {/* 广告位区域 - 占1/3高度 */}
      <div className="relative h-1/3 flex items-center justify-center px-4 z-10">
        <div className="w-full max-w-4xl flex justify-center">
          
          {width != null && (width < 1024 
            ? <a href="https://t.acrsmartcam.com/380687/7070?bo=2779,2778,2777,2776,2775&popUnder=true&aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0002"><img src="https://www.imglnkx.com/2676/001753A_LIJA_18_ALL_EN_71_L.gif" width="300" height="250" /></a> 
            : <a href="https://t.acrsmartcam.com/380687/7070?bo=2779,2778,2777,2776,2775&popUnder=true&aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0002"><img src="https://www.imglnkx.com/2676/001754A_LIJA_13_ALL_EN_83_L.gif" width="950" height="250" /></a>
          )}
        </div>
      </div>
    </section>
  )
} 