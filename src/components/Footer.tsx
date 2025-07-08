'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer');
  
  return (
    <footer className="w-full glass-effect-dark border-t border-seductive-purple/20 py-6 relative overflow-hidden">
      {/* 背景装饰 - 暧昧色调 */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-0 left-1/3 w-32 h-32 bg-seductive-purple/30 rounded-full blur-2xl pulse-seductive"></div>
        <div className="absolute bottom-0 right-1/3 w-24 h-24 bg-seductive-red/25 rounded-full blur-2xl pulse-seductive" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-0 right-1/4 w-20 h-20 bg-seductive-magenta/20 rounded-full blur-2xl pulse-seductive" style={{animationDelay: '0.8s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-passion neon-text-pink">
            {t('brand')}
          </Link>
          
          {/* 导航链接 */}
          <nav className="flex flex-wrap justify-center gap-8 text-base">
            <Link 
              href="/about" 
              className="text-white/70 hover:text-white transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-primary hover:neon-text"
            >
              {t('about')}
            </Link>
            <Link 
              href="/privacy" 
              className="text-white/70 hover:text-white transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-accent hover:neon-text"
            >
              {t('privacy')}
            </Link>
            <Link 
              href="/terms" 
              className="text-white/70 hover:text-white transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-seductive hover:neon-text"
            >
              {t('terms')}
            </Link>
            <Link 
              href="/contact" 
              className="text-white/70 hover:text-white transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-wine hover:neon-text"
            >
              {t('contact')}
            </Link>
          </nav>
          
          {/* 版权信息 */}
          <div className="text-center text-white/60">
            <p className="text-lg font-medium">© 2024 {t('brand')}. {t('rights')}.</p>
            <p className="mt-3 text-white/50 max-w-lg">
              {t('cookieNotice')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 