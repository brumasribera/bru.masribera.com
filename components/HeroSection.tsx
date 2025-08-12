import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Mail, MapPin, Linkedin, Github } from 'lucide-react'
import { useState, useEffect } from 'react'

export function HeroSection() {
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hackText, setHackText] = useState('BRU MAS RIBERA')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const progress = Math.min(scrollY / (documentHeight - windowHeight), 1)
      
      setScrollProgress(progress)
      
      if (scrollY > 100) {
        setShowScrollHint(false)
      } else {
        setShowScrollHint(true)
      }

      // Calculate hack progress based on scroll position (0px to 100px range - longer distance for more visible animation)
      let hackProgress = 0
      if (scrollY > 0) {
        hackProgress = Math.min(scrollY / 100, 1) // 0 to 1 over 100px for longer animation
      }
      
      // Update text based on scroll position
      updateHackText(hackProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const updateHackText = (progress: number) => {
    const originalText = 'BRU MAS RIBERA'
    const targetText = '@brumasribera'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
    const numbers = '0123456789'
    
    if (progress <= 0) {
      setHackText(originalText)
      return
    }
    
    if (progress >= 1) {
      setHackText(targetText + '|') // Add blinking cursor at end state
      return
    }

    // Create stable scrambled text that gradually reveals the target
    const scrambledText = targetText.split('').map((char, index) => {
      const charProgress = progress * targetText.length
      
      if (index < charProgress) {
        // This character should be revealed
        return char
      } else {
        // This character should be scrambled - use stable scrambling based on progress
        const stableIndex = Math.floor(progress * 10) // Reduce frequency of changes
        if (stableIndex % 2 === 0) {
          return symbols[index % symbols.length]
        } else {
          return numbers[index % numbers.length]
        }
      }
    }).join('')

    setHackText(scrambledText)
  }

  // Dynamic gradient based on scroll progress
  const getGradientColors = () => {
    if (scrollProgress < 0.3) {
      return 'from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300'
    } else if (scrollProgress < 0.6) {
      return 'from-purple-600 via-pink-500 to-rose-500 dark:from-purple-400 dark:via-pink-300 dark:to-rose-300'
    } else if (scrollProgress < 0.9) {
      return 'from-orange-600 via-red-500 to-pink-500 dark:from-orange-400 dark:via-red-300 dark:to-pink-300'
    } else {
      return 'from-indigo-600 via-blue-500 to-cyan-500 dark:from-indigo-400 dark:via-blue-300 dark:to-cyan-300'
    }
  }

  // Calculate hack progress for animations
  const hackProgress = Math.max(0, Math.min(1, window.scrollY / 100))

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/mountain-background.jpg")'
          }}
        />
        {/* Gradient overlay for better readability and effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/70 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          <Avatar className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 border border-gray-300 dark:border-gray-600 shadow-lg">
            <AvatarImage 
              src="/profile-optimized.jpg" 
              alt="Bru Mas Ribera" 
              className="object-cover"
            />
            <AvatarFallback className="text-4xl sm:text-5xl lg:text-6xl">BR</AvatarFallback>
          </Avatar>
        </div>

        {/* Location Badge */}
        <div className="inline-flex items-center rounded-full bg-white/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-600 px-4 py-2 mb-6">
          <MapPin className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-300" />
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Based in Meiringen, Switzerland</span>
        </div>
        
        {/* Name with Dynamic Gradient and Hacking Effect */}
        <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${getGradientColors()} font-friendly tracking-wide mb-4 transition-all duration-100`} style={{ paddingBottom: '0.2em', paddingTop: '0.1em' }}>
          {hackProgress >= 1 ? (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300">
              @brumasribera<span className="animate-cursor-blink font-mono" style={{ fontSize: '1.2em', fontWeight: '900', letterSpacing: '0.1em' }}>|</span>
            </span>
          ) : (
            hackText
          )}
        </h1>
        
        {/* Title */}
        <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
          Frontend & UX Engineer from Barcelona
        </p>
        
        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button size="lg" className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-6 transition-colors duration-200">
            <Mail className="mr-2 h-4 w-4" />
            brumasribera@gmail.com
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="lg" className="bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
            <Button variant="outline" size="lg" className="bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </div>

        {/* Download CV Button */}
        {/* <Button variant="outline" size="lg" className="mb-8 bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
          <Download className="mr-2 h-4 w-4" />
          Download CV
        </Button> */}
        
        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
          {['React', 'TypeScript', 'Python', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Figma'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Hint - At bottom of first section */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${showScrollHint ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center">
          {/* Animated gradient line with wave effect */}
          <div className="relative w-[3px] h-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-400 via-gray-500 to-transparent rounded-full animate-wave-fade"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

