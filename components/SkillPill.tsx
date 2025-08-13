interface SkillPillProps {
  name: string
  emoji: string
  url: string
  className?: string
}

export function SkillPill({ name, emoji, url, className = '' }: SkillPillProps) {
  return (
    <button
      onClick={() => window.open(url, '_blank')}
      className={`group relative px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 cursor-pointer overflow-hidden hover:pr-8 sm:hover:pr-10 ${className}`}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-white/30 to-transparent transition-transform duration-700 -translate-x-full group-hover:translate-x-full"></div>
     
      {/* Content */}
      <span className="relative z-10">{name}</span>
      
      {/* Emoji with pop-out animation */}
      <span className="absolute right-3 sm:right-4 top-0 bottom-0 flex items-center transition-all duration-300 text-xs sm:text-sm opacity-0 group-hover:opacity-100 group-hover:scale-110">
        {emoji}
      </span>
    </button>
  )
}
