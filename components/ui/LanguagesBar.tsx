import { LanguagePill } from './LanguagePill'
import { useState, useEffect } from 'react'

export function LanguagesBar() {
  const [autoHoveredPill, setAutoHoveredPill] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const languages = [
    { label: 'English', level: 'C2', flag: '/flags/en.png' },
    { label: 'French', level: 'C2', flag: '/flags/fr.png' },
    { label: 'Spanish', level: 'Native', flag: '/flags/es.png' },
    { label: 'Catalan', level: 'Native', flag: '/flags/ca.png' },
    { label: 'Italian', level: 'C1', flag: '/flags/it.png' },
    { label: 'German', level: 'B1', flag: '/flags/de.png' },
    { label: 'Portuguese', level: 'B1', flag: '/flags/pt.png' }
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
    <section id="languages-bar" className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center">
          {languages.map((lang) => (
            <LanguagePill
              key={lang.label}
              label={lang.label}
              level={lang.level}
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


