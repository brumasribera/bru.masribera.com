import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { ExperienceSection } from './components/ExperienceSection'
import { EducationSection } from './components/EducationSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { OpenHutsPage } from './components/OpenHutsPage'
import { MoodleNetPage } from './components/MoodleNetPage'
import { ReservePage } from './components/ReservePage'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    // Default to system preference, fallback to dark
    return window.matchMedia('(prefers-color-scheme: dark)').matches || true
  })

  useEffect(() => {
    // Apply the theme on mount
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        const newMode = e.matches
        setIsDarkMode(newMode)
        if (newMode) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
  }

  // Removed resetToSystemPreference (not used)

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Global Dark Mode Toggle - Always on top */}
        <div className="fixed top-6 right-6 z-50">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg"
            aria-label="Toggle dark mode"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        <Routes>
          <Route path="/" element={
            <>
              <main>
                <HeroSection />
                <AboutSection />
                <ExperienceSection />
                <EducationSection />
                <ProjectsSection />
                <ContactSection />
              </main>
              <Footer />
            </>
          } />
          <Route path="/openhuts" element={<OpenHutsPage />} />
          <Route path="/moodlenet" element={<MoodleNetPage />} />
          <Route path="/reserve" element={<ReservePage />} />
        </Routes>
      </div>
    </Router>
  )
}