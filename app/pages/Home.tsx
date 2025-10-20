'use client'

import { NavigationHeader, MainContent, Footer } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <NavigationHeader />
      
      <MainContent layout="default">
        <div className="text-center space-y-8 py-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('home.welcome')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">{t('home.analytics.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.analytics.desc')}
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">{t('home.design.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.design.desc')}
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">{t('home.performance.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.performance.desc')}
              </p>
            </div>
          </div>
        </div>
      </MainContent>

      <Footer 
        copyright={t('footer.copyright')}
        links={[
          { label: t('footer.about'), href: '/about' },
          { label: t('footer.docs'), href: '/docs' },
          { label: t('footer.support'), href: '/support' }
        ]}
      />
    </>
  )
}
