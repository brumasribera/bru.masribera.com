import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../App.tsx'
import '../styles/globals.css'
import { i18nReady } from './i18n' // Import i18n configuration and ready promise

// Custom hook for automatic URL updates based on scroll position
function useScrollBasedNavigation() {
  const [currentSection, setCurrentSection] = React.useState<string>('')

  React.useEffect(() => {
    // Only run on home page
    if (window.location.pathname !== '/') return

    const sections = document.querySelectorAll('section[id], div[id]')
    const sectionIds = Array.from(sections).map(section => section.id).filter(Boolean)
    
    const updateCurrentSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3
      
      let activeSection = ''
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            activeSection = sectionId
            break
          }
        }
      }
      
      if (activeSection && activeSection !== currentSection) {
        setCurrentSection(activeSection)
        // Update URL without triggering scroll, but only if we're not already at that hash
        const newUrl = activeSection === 'home' ? '/' : `/#${activeSection}`
        if (window.location.hash !== `#${activeSection}`) {
          window.history.replaceState(null, '', newUrl)
        }
      }
    }

    // Throttle scroll events for better performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateCurrentSection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateCurrentSection() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentSection])

  return currentSection
}

// Wrap the App with the navigation hook
function AppWithNavigation() {
  useScrollBasedNavigation()
  return <App />
}

// Create root once and reuse it
const root = ReactDOM.createRoot(document.getElementById('root')!)

// Wait for i18n to be ready before rendering
i18nReady.then(() => {
  root.render(
    <React.StrictMode>
      <AppWithNavigation />
    </React.StrictMode>
  )
}).catch((error) => {
  console.error('Failed to initialize i18n:', error)
  // Fallback: render without waiting for i18n
  root.render(
    <React.StrictMode>
      <AppWithNavigation />
    </React.StrictMode>
  )
})
