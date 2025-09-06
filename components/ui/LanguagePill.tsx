

interface LanguagePillProps {
  label: string
  level: string
  flag: string
  className?: string
  isAutoHovered?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  levelKey?: string // Add this to handle styling logic
}

export function LanguagePill({ label, level, flag, className = '', isAutoHovered = false, onMouseEnter, onMouseLeave, levelKey }: LanguagePillProps) {
  // Use levelKey for styling logic, fallback to level if not provided
  const levelForStyling = levelKey || level
  
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 cursor-pointer overflow-hidden ${
        isAutoHovered ? 'scale-105 shadow-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20' : ''
      } ${className}`}
    >
      {/* Shine effect */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-white/30 to-transparent transition-transform duration-700 ${
        isAutoHovered ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'
      }`}></div>
      
      {/* Content (wrap allowed) */}
      <div className="relative z-10 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-medium">{label}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
          levelForStyling === 'Native' || levelForStyling === 'languages.proficiency.native' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
          levelForStyling === 'C2' || levelForStyling === 'languages.proficiency.c2' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
          levelForStyling === 'C1' || levelForStyling === 'languages.proficiency.c1' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-emerald-300' :
          levelForStyling === 'B2' || levelForStyling === 'languages.proficiency.b2' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
          'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' // B1 level
        }`}>
          {level}
        </span>
        {/* Flag with animated reveal (in-flow, not overlapping) */}
        <div
          className={`ml-1 h-4 overflow-hidden transition-all duration-300 flex items-center ${
            isAutoHovered ? 'w-5 opacity-100' : 'w-0 opacity-0 group-hover:w-5 group-hover:opacity-100'
          }`}
        >
          <img
            src={flag}
            alt={`${label} flag`}
            className="w-5 h-4 object-cover rounded-sm"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>
      </div>
    </div>
  )
}
