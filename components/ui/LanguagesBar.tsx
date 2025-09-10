import { LanguagePill } from './LanguagePill'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function LanguagesBar() {
  const { t } = useTranslation(['home'])
  const [autoHoveredPill, setAutoHoveredPill] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const languages = [
    { label: 'languages.languages.english', level: 'languages.proficiency.c2', flag: '/icons/flags/england-flag.png' },
    { label: 'languages.languages.french', level: 'languages.proficiency.c2', flag: '/icons/flags/france-flag.png' },
    { label: 'languages.languages.spanish', level: 'languages.proficiency.native', flag: '/icons/flags/spain-flag.png' },
    { label: 'languages.languages.catalan', level: 'languages.proficiency.native', flag: '/icons/flags/canada-flag.png' },
    { label: 'languages.languages.italian', level: 'languages.proficiency.b2', flag: '/icons/flags/italy-flag.png' },
    { label: 'languages.languages.german', level: 'languages.proficiency.b1', flag: '/icons/flags/germany-flag.png' },
    { label: 'languages.languages.portuguese', level: 'languages.proficiency.b1', flag: '/icons/flags/portugal-flag.png' }
  ]

  useEffect(() => {
    if (isPaused) return

    let shuffledLanguages = [...languages].sort(() => 0.5 - Math.random()) // Shuffle languages
    let currentIndex = 0

    const interval = setInterval(() => {
      // Get current language to hover
      const currentLanguage = shuffledLanguages[currentIndex]
      setAutoHoveredPill(currentLanguage.label)

      // Move to next language
      currentIndex++
      
      // If we've gone through all languages, shuffle again and restart
      if (currentIndex >= shuffledLanguages.length) {
        shuffledLanguages = [...languages].sort(() => 0.5 - Math.random())
        currentIndex = 0
      }
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [isPaused, languages])

  return (
    <section id="languages-bar" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('languages.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('languages.subtitle')}
          </p>
        </div>

        {/* Language URL display removed */}
        
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center">
          {languages.map((lang) => (
            <LanguagePill
              key={lang.label}
              label={t(lang.label)}
              level={t(lang.level)}
              levelKey={lang.level}
              flag={lang.flag}
              isAutoHovered={autoHoveredPill === lang.label}
              onMouseEnter={() => {
                setIsPaused(true)
                setAutoHoveredPill(null) // Clear any auto-hover
              }}
              onMouseLeave={() => {
                setIsPaused(false)
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}


