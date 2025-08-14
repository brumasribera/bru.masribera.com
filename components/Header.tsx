import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react'
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
  const [hackText, setHackText] = useState('BRU MAS RIBERA') // Added for animation
  const [isProjectsOpen, setIsProjectsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Close projects menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-projects-menu]')) {
        setIsProjectsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-mobile-menu]')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

  // Handle scrolling to sections after navigation from project pages
  useEffect(() => {
    if (location.pathname === '/') {
      const targetSection = sessionStorage.getItem('scrollToSection')
      if (targetSection) {
        sessionStorage.removeItem('scrollToSection')
        setTimeout(() => {
          const targetElement = document.getElementById(targetSection)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'auto' })
          }
        }, 100)
      }
    }
  }, [location.pathname])

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#projects', label: 'Projects', hasDropdown: true },
    { href: '#contact', label: 'Contact' }
  ]

  const projectPages = [
    { path: '/reserve', label: 'Reserve', description: 'Restaurant reservation platform' },
    { path: '/openhuts', label: 'Open Huts', description: 'Nature network platform' },
    { path: '/moodlenet', label: 'MoodleNet', description: 'Educational platform' },
    { path: '/pix4d', label: 'Pix4D', description: 'Cloud platform & 3D modeling' },
    { path: '/wegaw', label: 'Wegaw', description: 'Snow monitoring for outdoor activities' },
    { path: '/pomoca', label: 'Pomoca', description: 'Production interface for manufacturing' }
  ]

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '')
    
    // If we're on a project page, navigate to home page first
    if (location.pathname !== '/') {
      navigate('/')
      // Use setTimeout to ensure navigation completes before scrolling
      setTimeout(() => {
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'auto' })
        }
      }, 100)
      return
    }
    
    // On home page, scroll to section without animation
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'auto' })
    }
    setIsMenuOpen(false)
  }

  // New function to handle navigation from project pages
  const handleNavigationFromProjectPage = (href: string) => {
    const targetId = href.replace('#', '')
    
    if (location.pathname !== '/') {
      // Navigate to home page first
      navigate('/')
      // Store the target section to scroll to after navigation
      sessionStorage.setItem('scrollToSection', targetId)
    } else {
      // Already on home page, scroll directly
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'auto' })
      }
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

    // Create character-by-character transformation with symbols (same as hero)
    const totalChars = Math.max(originalText.length, targetText.length)
    const charsToTransform = Math.floor(progress * totalChars)
    
    let transformedText = ''
    
    for (let i = 0; i < totalChars; i++) {
      if (i < charsToTransform) {
        // This character has been transformed
        if (i < targetText.length) {
          transformedText += targetText[i]
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
          transformedText += i < originalText.length ? originalText[i] : ''
        }
      }
    }
    
    // Ensure we always have a valid string
    if (transformedText.length === 0) {
      transformedText = originalText
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
                // Start the encryption animation with same timing as hero section
                let progress = 0
                const steps = 20
                const stepDuration = 50 // 50ms per step for smooth 1-second animation
                
                const animate = () => {
                  if (progress < 1 && isHovering) {
                    progress += 1 / steps
                    updateHackText(progress)
                    console.log('Animation progress:', progress, 'Text:', hackText)
                    if (progress < 1) {
                      setTimeout(animate, stepDuration)
                    }
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
                 style={{ 
                   backgroundSize: '200% 200%',
                   animation: 'flowing-gradient 8s ease-in-out infinite'
                 }}
               >
                 {hackText}
               </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {item.hasDropdown ? (
                  <div className="relative" data-projects-menu>
                    <button
                      onClick={() => {
                        // Click navigates directly to projects section
                        if (location.pathname !== '/') {
                          navigate('/#projects')
                        } else {
                          scrollToSection('#projects')
                        }
                      }}
                      onMouseEnter={() => setIsProjectsOpen(true)}
                      className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                        activeSection === item.href.replace('#', '')
                          ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProjectsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Projects Dropdown */}
                    {isProjectsOpen && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                        onMouseEnter={() => setIsProjectsOpen(true)}
                        onMouseLeave={() => setIsProjectsOpen(false)}
                      >
                        {projectPages.map((project) => (
                          <button
                            key={project.path}
                            onClick={() => {
                              navigate(project.path)
                              setIsProjectsOpen(false)
                              window.scrollTo(0, 0)
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="font-medium text-gray-900 dark:text-white">{project.label}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{project.description}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavigationFromProjectPage(item.href)}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === item.href.replace('#', '')
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
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
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700" data-mobile-menu>
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.hasDropdown ? (
                    <div data-projects-menu>
                      <button
                        onClick={() => {
                          // Click navigates directly to projects section
                          if (location.pathname !== '/') {
                            navigate('/#projects')
                          } else {
                            scrollToSection('#projects')
                          }
                        }}
                        onMouseEnter={() => setIsProjectsOpen(true)}
                        className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg flex items-center justify-between"
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProjectsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isProjectsOpen && (
                        <div className="ml-4 mt-2 space-y-1">
                          {projectPages.map((project) => (
                            <button
                              key={project.path}
                              onClick={() => {
                                navigate(project.path)
                                setIsMenuOpen(false)
                                setIsProjectsOpen(false)
                                window.scrollTo(0, 0)
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                            >
                              {project.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                        activeSection === item.href.replace('#', '')
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
