import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

export function useProjectNavigation() {
  const navigate = useNavigate()

  const navigateToProject = (path: string) => {
    // Get current language from URL to avoid circular reference issues
    const currentLang = window.location.pathname.match(/^\/([a-z]{2})(\/|$)/)?.[1] || 'en'
    
    // Navigate to the project page with current language preserved
    const projectPath = currentLang === 'en' ? path : `/${currentLang}${path}`
    navigate(projectPath)
    
    // Scroll to top after navigation completes (no visible scroll on current page)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }, 150)
  }

  const navigateToHome = useCallback(() => {
    // Get current language from URL to avoid circular reference issues
    const currentLang = window.location.pathname.match(/^\/([a-z]{2})(\/|$)/)?.[1] || 'en'
    
    // Navigate to home with current language preserved
    const homePath = currentLang === 'en' ? '/' : `/${currentLang}`
    navigate(homePath)
    
    // Wait for navigation to complete, then scroll to projects section without smooth scrolling
    setTimeout(() => {
      const projectsSection = document.getElementById('projects')
      
      if (projectsSection) {
        // Calculate position with navbar offset (64px = h-16)
        const navbarHeight = 64
        const elementTop = projectsSection.offsetTop - navbarHeight
        
        // Scroll without smooth behavior for instant positioning
        window.scrollTo({ top: elementTop, behavior: 'auto' })
      } else {
        // Alternative approach: use URL hash with auto behavior
        window.location.hash = 'projects'
        
        // Force scroll to top of projects section without smooth behavior
        setTimeout(() => {
          const element = document.getElementById('projects')
          if (element) {
            element.scrollIntoView({ behavior: 'auto', block: 'start' })
            // Adjust for navbar offset
            window.scrollBy({ top: -64, behavior: 'auto' })
          }
        }, 50)
      }
    }, 200)
  }, [navigate])

  return {
    navigateToProject,
    navigateToHome
  }
}
