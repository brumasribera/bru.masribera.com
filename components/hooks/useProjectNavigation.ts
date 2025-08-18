import { useNavigate } from 'react-router-dom'
import { useLanguageRouting } from './useLanguageRouting'

export function useProjectNavigation() {
  const navigate = useNavigate()
  const { getLocalizedPath } = useLanguageRouting()

  const navigateToProject = (path: string) => {
    // Navigate to the project page with current language preserved
    navigate(getLocalizedPath(path))
  }

  const navigateToHome = () => {
    // Navigate to home with current language preserved
    navigate(getLocalizedPath('/#projects'))
  }

  return {
    navigateToProject,
    navigateToHome
  }
}
