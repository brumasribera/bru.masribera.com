import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Mail, MapPin, Linkedin, Github } from 'lucide-react'
import { useState, useEffect } from 'react'

export function HeroSection() {
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hackText, setHackText] = useState('BRU MAS RIBERA')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const progress = Math.min(scrollY / (documentHeight - windowHeight), 1)
      
      setScrollProgress(progress)
      
      if (scrollY > 100) {
        setShowScrollHint(false)
      } else {
        setShowScrollHint(true)
      }

      // Calculate hack progress based on scroll position (0px to 100px range - longer distance for more visible animation)
      let hackProgress = 0
      if (scrollY > 0) {
        hackProgress = Math.min(scrollY / 100, 1) // 0 to 1 over 100px for longer animation
      }
      
      // Update text based on scroll position
      updateHackText(hackProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const updateHackText = (progress: number) => {
    const originalText = 'BRU MAS RIBERA'
    const targetText = '@brumasribera'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
    const numbers = '0123456789'
    
    if (progress <= 0) {
      setHackText(originalText)
      return
    }
    
    if (progress >= 1) {
      setHackText(targetText)
      return
    }

    // Create character-by-character transformation with more symbols
    const totalChars = originalText.length
    const charsToTransform = Math.floor(progress * totalChars)
    
    let transformedText = ''
    
    for (let i = 0; i < totalChars; i++) {
      if (i < charsToTransform) {
        // This character has been transformed
        if (i === 0) {
          transformedText += '@' // First character becomes @
        } else if (i === 1) {
          transformedText += 'b' // Second character becomes b
        } else if (i === 2) {
          transformedText += 'r' // Third character becomes r
        } else if (i === 3) {
          transformedText += 'u' // Fourth character becomes u
        } else if (i === 4) {
          transformedText += 'm' // Fifth character becomes m
        } else if (i === 5) {
          transformedText += 'a' // Sixth character becomes a
        } else if (i === 6) {
          transformedText += 's' // Seventh character becomes s
        } else if (i === 7) {
          transformedText += 'r' // Eighth character becomes r
        } else if (i === 8) {
          transformedText += 'i' // Ninth character becomes i
        } else if (i === 9) {
          transformedText += 'b' // Tenth character becomes b
        } else if (i === 10) {
          transformedText += 'e' // Eleventh character becomes e
        } else if (i === 11) {
          transformedText += 'r' // Twelfth character becomes r
        } else if (i === 12) {
          transformedText += 'a' // Thirteenth character becomes a
        }
      } else {
        // This character is still in transition - show intermediate symbols
        const transitionProgress = (progress * totalChars) - i
        if (transitionProgress > 0) {
          // Show cool symbols before the final transformation
          const symbolIndex = Math.floor((progress * 20 + i * 3) % symbols.length)
          transformedText += symbols[symbolIndex]
        } else {
          // Keep original character
          transformedText += originalText[i]
        }
      }
    }

    setHackText(transformedText)
  }

  // Dynamic gradient based on scroll progress
  const getGradientColors = () => {
    if (scrollProgress < 0.3) {
      return 'from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300'
    } else if (scrollProgress < 0.6) {
      return 'from-purple-600 via-pink-500 to-rose-500 dark:from-purple-400 dark:via-pink-300 dark:to-rose-300'
    } else if (scrollProgress < 0.9) {
      return 'from-orange-600 via-red-500 to-pink-500 dark:from-orange-400 dark:via-red-300 dark:to-pink-300'
    } else {
      return 'from-indigo-600 via-blue-500 to-cyan-500 dark:from-indigo-400 dark:via-blue-300 dark:to-cyan-300'
    }
  }

  // Calculate hack progress for animations
  const hackProgress = Math.max(0, Math.min(1, window.scrollY / 100))

  return (
         <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
       {/* Background Image with Overlay */}
       <div className="absolute inset-0 z-0">
         <div 
           className="w-full h-full bg-cover bg-center bg-no-repeat"
           style={{
             backgroundImage: 'url("/mountain-background.jpg")'
           }}
         />
         {/* Gradient overlay for better readability and effect */}
         <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/70 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/70"></div>
       </div>

       {/* Content */}
       <div className="relative z-10 max-w-5xl mx-auto text-center">
         {/* Profile Picture */}
         <div className="flex justify-center mb-6 sm:mb-8 lg:mb-10">
           <Avatar className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 border border-gray-300 dark:border-gray-600 shadow-lg">
             <AvatarImage 
               src="/profile-original.png" 
               alt="Bru Mas Ribera" 
               className="object-cover"
             />
             <AvatarFallback className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">b|</AvatarFallback>
           </Avatar>
         </div>

         {/* Location Badge - Better breathing room */}
         <div className="w-full max-w-md mx-auto mb-5 sm:mb-6 lg:mb-8 flex items-center justify-center">
           <div className="inline-flex items-center rounded-full bg-white/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-600 px-3 py-1.5 sm:px-4 sm:py-2">
             <MapPin className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-gray-700 dark:text-gray-300" />
             <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">Based in Meiringen, Switzerland</span>
           </div>
         </div>
         
         {/* Name with Dynamic Gradient and Hacking Effect - Better breathing room */}
         <div className="w-full max-w-4xl mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center">
           <h1 className={`text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${getGradientColors()} font-friendly tracking-wide transition-all duration-100`} style={{ paddingBottom: '0.1em', paddingTop: '0.05em' }}>
             {hackProgress >= 1 ? (
               <>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300">
                   @brumasribera
                 </span>
                 <span className="text-cyan-500 dark:text-cyan-300 animate-cursor-blink font-mono" style={{ fontSize: '1.2em', fontWeight: '900', letterSpacing: '0.1em' }}>|</span>
               </>
             ) : (
               hackText
             )}
           </h1>
         </div>
         
         {/* Title - Much closer to title, closer to buttons */}
         <div className="w-full max-w-3xl mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center">
           <p className="text-lg sm:text-xl lg:text-2xl xl:text-2xl text-gray-700 dark:text-gray-300">
             Frontend & UX Engineer from Barcelona
           </p>
         </div>
         
         {/* Contact Buttons - Closer to subtitle with advanced hover animations */}
         <div className="w-full max-w-xl mx-auto mb-5 sm:mb-6 lg:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 justify-center items-center">
                       <Button 
              size="lg" 
              className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-4 sm:px-6 transition-colors duration-200 text-sm sm:text-base"
              onClick={() => window.open('mailto:bru@masribera.com', '_blank')}
            >
              <Mail className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              bru@masribera.com
            </Button>
           <div className="flex gap-3 sm:gap-4">
             <Button 
               variant="outline" 
               size="lg" 
               className="group bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm sm:text-base"
               onClick={() => window.open('https://linkedin.com/in/brumasribera', '_blank')}
             >
               <Linkedin className="mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-all duration-500 group-hover:fill-current group-hover:scale-110" />
               LinkedIn
             </Button>
             <Button 
               variant="outline" 
               size="lg" 
               className="group bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm sm:text-base"
               onClick={() => window.open('https://github.com/brumasribera', '_blank')}
             >
               <Github className="mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-all duration-500 group-hover:fill-current group-hover:scale-110" />
               GitHub
             </Button>
           </div>
         </div>
         
         {/* Skills - Wider container, hover effects, emojis, and clickable with pop-out animation */}
         <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-8 flex flex-wrap justify-center gap-2 sm:gap-3 items-center">
           {[
             { name: 'Cursor', emoji: '⚡', url: 'https://cursor.sh' },
             { name: 'React', emoji: '⚛️', url: 'https://react.dev' },
             { name: 'Figma', emoji: '🎨', url: 'https://figma.com' },
             { name: 'TypeScript', emoji: '🔷', url: 'https://typescriptlang.org' },
             { name: 'Next', emoji: '🚀', url: 'https://nextjs.org' },
             { name: 'Vue', emoji: '💚', url: 'https://vuejs.org' },
             { name: 'Node', emoji: '🟢', url: 'https://nodejs.org' },
             { name: 'PostgreSQL', emoji: '🐘', url: 'https://postgresql.org' },
             { name: 'Docker', emoji: '🐳', url: 'https://docker.com' }
           ].map((skill) => (
             <button
               key={skill.name}
               onClick={() => window.open(skill.url, '_blank')}
               className="group relative px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 cursor-pointer overflow-hidden hover:pr-8 sm:hover:pr-10"
             >
               {/* Shine effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
               
               {/* Content */}
               <span className="relative z-10">{skill.name}</span>
               
               {/* Emoji with pop-out animation */}
               <span className="absolute right-3 sm:right-4 top-0 bottom-0 flex items-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 text-xs sm:text-sm">
                 {skill.emoji}
               </span>
             </button>
           ))}
         </div>
       </div>

             {/* Scroll Hint - Responsive positioning, never overlaps */}
       <div className={`absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 z-0 ${showScrollHint ? 'opacity-100' : 'opacity-0'}`}>
         <div className="flex flex-col items-center">
           {/* Animated gradient line with wave effect */}
           <div className="relative w-[2px] sm:w-[3px] h-12 sm:h-16 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-gray-400 via-gray-500 to-transparent rounded-full animate-wave-fade"></div>
           </div>
         </div>
       </div>
    </section>
  )
}

