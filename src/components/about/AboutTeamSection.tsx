'use client'

import { useTranslations } from 'next-intl'

export default function AboutTeamSection() {
  const t = useTranslations('about.team');
  const r = useTranslations('about.team.roles');

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white neon-text-pink">{t('title')}</h2>
          <p className="text-lg text-white/70 mt-4 max-w-3xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-lg bg-white/5 transition-all duration-300 hover:bg-white/10 hover:shadow-neon-light">
            <div className="text-4xl mb-2">👨‍💻</div>
            <p className="text-white/70 text-sm">{r('aiExpert')}</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white/5 transition-all duration-300 hover:bg-white/10 hover:shadow-neon-light">
            <div className="text-4xl mb-2">⚙️</div>
            <p className="text-white/70 text-sm">{r('engineer')}</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white/5 transition-all duration-300 hover:bg-white/10 hover:shadow-neon-light">
            <div className="text-4xl mb-2">🎨</div>
            <p className="text-white/70 text-sm">{r('designer')}</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white/5 transition-all duration-300 hover:bg-white/10 hover:shadow-neon-light">
            <div className="text-4xl mb-2">🔬</div>
            <p className="text-white/70 text-sm">{r('techExpert')}</p>
          </div>
        </div>
      </div>
    </section>
  )
} 