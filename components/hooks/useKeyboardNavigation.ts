import { useEffect } from 'react'
import { useProjectNavigation } from './useProjectNavigation'

interface UseKeyboardNavigationProps {
  prevProjectPath: string
  nextProjectPath: string
}

export function useKeyboardNavigation({ prevProjectPath, nextProjectPath }: UseKeyboardNavigationProps) {
  const { navigateToProject } = useProjectNavigation()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle arrow keys if not typing in an input field
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          navigateToProject(prevProjectPath)
          break
        case 'ArrowRight':
          event.preventDefault()
          navigateToProject(nextProjectPath)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigateToProject, prevProjectPath, nextProjectPath])
}
