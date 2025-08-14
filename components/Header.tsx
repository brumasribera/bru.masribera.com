import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { useLocation, useNavigate } from 'react-router-dom'

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [hackText, setHackText] = useState('BRU MAS RIBERA')
  const location = useLocation()
  const navigate = useNavigate()

  // Track active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id], div[id]')
      const scrollPosition = window.scrollY + window.innerHeight / 3
      
      let currentSection = ''
      for (const section of sections) {
        const element = section as HTMLElement
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          currentSection = element.id
          break
        }
      }
      
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ]

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '')
    
    // If we're on a project page, navigate to home page first
    if (location.pathname !== '/') {
      navigate(`/${href}`)
      return
    }
    
    // On home page, scroll to section
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/')
    } else {
      scrollToSection('#home')
    }
  }

  const updateHackText = (progress: number) => {
    const originalText = 'BRU MAS RIBERA'
    const targetText = '@brumasribera |'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
    
    if (progress <= 0) {
      setHackText(originalText)
      return
    }
    
    if (progress >= 1) {
      setHackText(targetText)
      return
    }

    // Create character-by-character transformation with more symbols
    const totalChars = originalText.length
    const charsToTransform = Math.floor(progress * totalChars)
    
    let transformedText = ''
    
    for (let i = 0; i < totalChars; i++) {
      if (i < charsToTransform) {
        // This character has been transformed
        if (i === 0) {
          transformedText += '@' // First character becomes @
        } else if (i === 1) {
          transformedText += 'b' // Second character becomes b
        } else if (i === 2) {
          transformedText += 'r' // Third character becomes r
        } else if (i === 3) {
          transformedText += 'u' // Fourth character becomes u
        } else if (i === 4) {
          transformedText += 'm' // Fifth character becomes m
        } else if (i === 5) {
          transformedText += 'a' // Sixth character becomes a
        } else if (i === 6) {
          transformedText += 's' // Seventh character becomes s
        } else if (i === 7) {
          transformedText += 'r' // Eighth character becomes r
        } else if (i === 8) {
          transformedText += 'i' // Ninth character becomes i
        } else if (i === 9) {
          transformedText += 'b' // Tenth character becomes b
        } else if (i === 10) {
          transformedText += 'e' // Eleventh character becomes e
        } else if (i === 11) {
          transformedText += 'r' // Twelfth character becomes r
        } else if (i === 12) {
          transformedText += 'a' // Thirteenth character becomes a
        }
      } else {
        // This character is still in transition - show intermediate symbols
        const transitionProgress = (progress * totalChars) - i
        if (transitionProgress > 0) {
          // Show cool symbols before the final transformation
          const symbolIndex = Math.floor((progress * 20 + i * 3) % symbols.length)
          transformedText += symbols[symbolIndex]
        } else {
          // Keep original character
          transformedText += originalText[i]
        }
      }
    }
    
    setHackText(transformedText)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={handleLogoClick}
              onMouseEnter={() => {
                setIsHovering(true)
                // Start the encryption animation
                let progress = 0
                const animate = () => {
                  if (progress < 1 && isHovering) {
                    progress += 0.1
                    updateHackText(progress)
                    requestAnimationFrame(animate)
                  }
                }
                animate()
              }}
              onMouseLeave={() => {
                setIsHovering(false)
                // Reset to original text
                setHackText('BRU MAS RIBERA')
              }}
              className="text-xl font-bold transition-all duration-300 hover:scale-105 relative"
            >
              <span 
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300 transition-all duration-300"
              >
                {hackText}
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
