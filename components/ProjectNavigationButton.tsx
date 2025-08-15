import { ArrowLeft } from 'lucide-react'
import { useFirstHoverTooltip } from './hooks/useFirstHoverTooltip'

interface ProjectNavigationButtonProps {
  direction: 'prev' | 'next'
  projectName: string
  onClick: () => void
}

export function ProjectNavigationButton({ direction, projectName, onClick }: ProjectNavigationButtonProps) {
  const { shouldShowTooltip, handleMouseEnter, handleMouseLeave } = useFirstHoverTooltip()
  
  const isPrev = direction === 'prev'
  const arrowClass = isPrev ? '' : 'rotate-180'
  const tooltipPosition = isPrev ? 'left-full ml-3' : 'right-full mr-3'
  const buttonPosition = isPrev ? 'left-2 sm:left-4' : 'right-2 sm:right-4'
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed ${buttonPosition} top-1/2 transform -translate-y-1/2 group z-40 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-gray-800/90 hover:bg-gray-100/95 dark:hover:bg-gray-700/95 text-gray-700 dark:text-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hidden sm:flex`}
    >
      <ArrowLeft className={`h-5 w-5 sm:h-6 sm:w-6 ${arrowClass}`} />
      
      {/* Tooltip */}
      {shouldShowTooltip && (
        <div className={`absolute ${tooltipPosition} px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-50`}>
          {projectName}
        </div>
      )}
    </button>
  )
}
