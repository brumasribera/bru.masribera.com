import { useNavigate } from 'react-router-dom'

export function useProjectNavigation() {
  const navigate = useNavigate()

  const navigateToProject = (path: string) => {
    // Navigate to the project page - should now work correctly without smooth scrolling
    navigate(path)
  }

  const navigateToHome = () => {
    navigate('/#projects')
  }

  return {
    navigateToProject,
    navigateToHome
  }
}
