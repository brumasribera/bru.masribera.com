interface LanguagePillProps {
  label: string
  level: string
  flag: string
  className?: string
  isAutoHovered?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function LanguagePill({ label, level, flag, className = '', isAutoHovered = false, onMouseEnter, onMouseLeave }: LanguagePillProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
             className={`group relative px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 cursor-pointer overflow-hidden hover:pr-8 sm:hover:pr-10 ${
         isAutoHovered ? 'scale-105 shadow-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 pr-8 sm:pr-10' : ''
       } ${className}`}
    >
      {/* Shine effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-white/30 to-transparent transition-transform duration-700 ${
        isAutoHovered ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'
      }`}></div>
     
             {/* Content */}
               <div className="relative z-10 flex items-center gap-2">
         <span className="font-medium">{label}</span>
         <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
           level === 'Native' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
           level === 'C2' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
           level === 'C1' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-emerald-300' :
           'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' // B1 level
         }`}>
           {level}
         </span>
       </div>
      
             {/* Flag with pop-out animation */}
               <img 
          src={flag} 
          alt={`${label} flag`}
          className={`absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-5 h-4 object-cover rounded-sm transition-all duration-300 ${
            isAutoHovered ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100 group-hover:scale-110'
          }`}
         onError={(e) => {
           // Fallback to text if image fails to load
           const target = e.target as HTMLImageElement;
           target.style.display = 'none';
           const fallback = document.createElement('span');
           fallback.className = `absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 transition-all duration-300 text-xs sm:text-sm ${
             isAutoHovered ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100 group-hover:scale-110'
           }`;
           fallback.textContent = label.charAt(0);
           target.parentNode?.insertBefore(fallback, target);
         }}
       />
    </div>
  )
}
