import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Mail, MapPin, Linkedin, Github } from 'lucide-react'
import { useState, useEffect } from 'react'
import { AnimatedGradientTitle } from '../ui/AnimatedGradientTitle'
import { useTranslation } from 'react-i18next'

export function HeroSection() {
  const { t, i18n } = useTranslation(['home', 'common'])
  const [autoHoveredPill, setAutoHoveredPill] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [hackText, setHackText] = useState('BRU MAS RIBERA')
  const [needsTopMargin, setNeedsTopMargin] = useState(false)

  // Debug: Log translation status
  useEffect(() => {
    if (i18n.isInitialized) {
      // Translation is ready
    }
  }, [i18n.isInitialized])

  // Check if we need top margin for the profile image
  useEffect(() => {
    const checkMarginNeeded = () => {
      const screenHeight = window.innerHeight
      const isSmallScreen = screenHeight < 800
      
      if (isSmallScreen) {
        // Check if the profile image is too close to the navbar
        const profileImage = document.querySelector('[data-profile-image]')
        if (profileImage) {
          const rect = profileImage.getBoundingClientRect()
          const navbarHeight = 64 // h-16 from Header component
          const minDistance = navbarHeight + 16 // navbar height + extra spacing
          
          // Only add margin if the image is too close to the navbar
          setNeedsTopMargin(rect.top < minDistance)
        }
      } else {
        setNeedsTopMargin(false)
      }
    }

    // Check on mount and resize
    checkMarginNeeded()
    window.addEventListener('resize', checkMarginNeeded)
    
    return () => window.removeEventListener('resize', checkMarginNeeded)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowScrollHint(scrollY <= 100)

      let hackProgress = 0
      if (scrollY > 0) {
        hackProgress = Math.min(scrollY / 100, 1)
      }
      updateHackText(hackProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const updateHackText = (progress: number) => {
    const originalText = 'BRU MAS RIBERA'
    const targetText = '@brumasribera'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

    if (progress <= 0) {
      setHackText(originalText)
      return
    }

    if (progress >= 1) {
      setHackText(targetText)
      return
    }

    const totalChars = originalText.length
    const charsToTransform = Math.floor(progress * totalChars)
    let transformedText = ''

    for (let i = 0; i < totalChars; i++) {
      if (i < charsToTransform) {
        if (i === 0) transformedText += '@'
        else if (i === 1) transformedText += 'b'
        else if (i === 2) transformedText += 'r'
        else if (i === 3) transformedText += 'u'
        else if (i === 4) transformedText += 'm'
        else if (i === 5) transformedText += 'a'
        else if (i === 6) transformedText += 's'
        else if (i === 7) transformedText += 'r'
        else if (i === 8) transformedText += 'i'
        else if (i === 9) transformedText += 'b'
        else if (i === 10) transformedText += 'e'
        else if (i === 11) transformedText += 'r'
        else if (i === 12) transformedText += 'a'
      } else {
        const transitionProgress = progress * totalChars - i
        if (transitionProgress > 0) {
          const symbolIndex = Math.floor((progress * 20 + i * 3) % symbols.length)
          transformedText += symbols[symbolIndex]
        } else {
          transformedText += originalText[i]
        }
      }
    }

    setHackText(transformedText)
  }

  const hackProgress = Math.max(0, Math.min(1, window.scrollY / 100))

  // Auto-hover effect for pills - cycles through all pills randomly every 2 seconds
  useEffect(() => {
    if (isPaused) return // Don't run when paused
    
    const skills = ['Cursor', 'React', 'Figma', 'TypeScript', 'Next', 'Vue', 'Node', 'PostgreSQL', 'Docker']
    let shuffledSkills = [...skills].sort(() => 0.5 - Math.random()) // Shuffle skills
    let currentIndex = 0
    
    const interval = setInterval(() => {
      if (isPaused) return // Check again in case it was paused during execution
      
      // Get current skill to hover
      const currentSkill = shuffledSkills[currentIndex]
      setAutoHoveredPill(currentSkill)
      
      // Stop auto-hover after 1.5 seconds
      setTimeout(() => {
        if (!isPaused) { // Only clear if still not paused
          setAutoHoveredPill(null)
        }
      }, 1500)
      
      // Move to next skill
      currentIndex++
      
      // If we've gone through all skills, shuffle again and restart
      if (currentIndex >= shuffledSkills.length) {
        shuffledSkills = [...skills].sort(() => 0.5 - Math.random())
        currentIndex = 0
      }
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <section id="home" className="relative py-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      {/* Background Image with soft overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/backgrounds/mountain-background.jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/80 dark:from-gray-900/90 dark:via-gray-900/85 dark:to-gray-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Profile Picture */}
        <div 
          className={`flex justify-center mb-8 ${needsTopMargin ? 'mt-20' : ''}`}
          data-profile-image
        >
          <Avatar className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 xl:w-56 xl:h-56 2xl:w-[220px] 2xl:h-[220px] border border-gray-200 dark:border-gray-700 shadow-md">
            <AvatarImage src="/profile/profile-original.png" alt="Bru Mas Ribera" className="object-cover" />
          </Avatar>
        </div>

        {/* Location pill */}
        <div className="w-full max-w-2xl mx-auto mb-6 flex flex-col items-center gap-3">
          <div className="inline-flex items-center rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2">
            <MapPin className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{t('hero.location')}</span>
          </div>
        </div>

        {/* Name */}
        <div className="w-full max-w-4xl mx-auto mb-4 flex items-center justify-center">
          <h1 className="font-friendly tracking-wide whitespace-nowrap">
            <AnimatedGradientTitle size="xl" className="font-bold">
              {hackProgress >= 1 ? (
                <>
                  @brumasribera
                  <span className="text-cyan-500 dark:text-cyan-300 animate-cursor-blink font-mono" style={{ fontSize: '1.2em', fontWeight: '900', letterSpacing: '0.1em' }}>|</span>
                </>
              ) : (
                hackText
              )}
            </AnimatedGradientTitle>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="w-full max-w-3xl mx-auto mb-6 flex items-center justify-center">
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            {t('hero.subtitle')}
          </p>
        </div>
        
        {/* Prominent total experience pill */}
        <div className="inline-flex items-center rounded-full px-4 py-2 sm:px-5 sm:py-2.5 shadow-xl ring-1 ring-white/50 dark:ring-white/10 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 mb-5 sm:mb-6 lg:mb-8">
            <span className="text-sm sm:text-base font-bold tracking-wide text-white">{t('hero.yearsExperience')}</span>
        </div>

        {/* Contact Buttons - Closer to subtitle with advanced hover animations */}
        <div className="w-full max-w-xl mx-auto mb-5 sm:mb-6 lg:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 justify-center items-center">
                      <Button 
              size="lg" 
              className="group bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-4 sm:px-6 transition-colors duration-200 text-sm sm:text-base"
              onClick={() => window.open('mailto:bru@masribera.com', '_blank')}
            >
            <Mail className="mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-all duration-300 group-hover:scale-110" />
            bru@masribera.com
          </Button>
          <div className="flex gap-3 sm:gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="group bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 text-sm sm:text-base shadow-md"
              onClick={() => window.open('https://linkedin.com/in/brumasribera', '_blank')}
            >
              <Linkedin className="mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-all duration-500 group-hover:fill-current group-hover:scale-110" />
              LinkedIn
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="group bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 text-sm sm:text-base shadow-md"
              onClick={() => window.open('https://github.com/brumasribera', '_blank')}
            >
              <Github className="mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-all duration-500 group-hover:fill-current group-hover:scale-110" />
              GitHub
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="group bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 text-sm sm:text-base shadow-md"
              onClick={() => {
                const match = window.location.pathname.match(/^\/(\w{2})(\/|$)/)
                const lng = match ? match[1] : 'en'
                const url = lng === 'en' ? '/documents/CV - Bru Mas Ribera.pdf' : `/documents/CV - Bru Mas Ribera (${lng.toUpperCase()}).pdf`
                window.open(url, '_blank')
              }}
            >
              <svg className="mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CV
            </Button>
          </div>
        </div>

        {/* Skills */}
        <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-8 flex flex-wrap justify-center gap-2 sm:gap-3 items-center">
          {[
            { name: 'Cursor', emoji: '⚡', url: 'https://cursor.sh' },
            { name: 'React', emoji: '⚛️', url: 'https://react.dev' },
            { name: 'Figma', emoji: '🎨', url: 'https://figma.com' },
            { name: 'TypeScript', emoji: '🔷', url: 'https://typescriptlang.org' },
            { name: 'Next', emoji: '🚀', url: 'https://nextjs.org' },
            { name: 'Vue', emoji: '💚', url: 'https://vuejs.org' },
            { name: 'Node', emoji: '🟢', url: 'https://nodejs.org' },
            { name: 'PostgreSQL', emoji: '🐘', url: 'https://postgresql.org' },
            { name: 'Docker', emoji: '🐳', url: 'https://docker.com' }
          ].map((skill) => (
            <button
              key={skill.name}
              onClick={() => window.open(skill.url, '_blank')}
              onMouseEnter={() => {
                setIsPaused(true)
                setAutoHoveredPill(null) // Clear any auto-hover
              }}
              onMouseLeave={() => {
                setIsPaused(false)
              }}
              className={`group relative px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 cursor-pointer overflow-hidden hover:pr-8 sm:hover:pr-10 ${
                autoHoveredPill === skill.name ? 'scale-105 shadow-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 pr-8 sm:pr-10' : ''
              }`}
            >
              {/* Shine effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-white/30 to-transparent transition-transform duration-700 ${
                autoHoveredPill === skill.name ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'
              }`}></div>
             
              {/* Content */}
              <span className="relative z-10">{skill.name}</span>
              
              {/* Emoji with pop-out animation */}
              <span className={`absolute right-3 sm:right-4 top-0 bottom-0 flex items-center transition-all duration-300 text-xs sm:text-sm ${
                autoHoveredPill === skill.name ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100 group-hover:scale-110'
              }`}>
                {skill.emoji}
          </span>
            </button>
          ))}
        </div>
        </div>

      {/* Scroll Hint */}
      <div className={`hidden 2xl:block absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 z-0 ${showScrollHint ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center">
          <div className="relative w-[6px] sm:w-[8px] h-24 sm:h-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-400 via-gray-500 to-transparent rounded-full animate-wave-fade"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

