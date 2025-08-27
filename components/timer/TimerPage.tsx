import { useState, useEffect, useRef, useCallback } from 'react'

// Simple audio paths
const GONG_SOUNDS = {
  minute: '/timer-sounds/1m-gong.mp3',
  middle: '/timer-sounds/middle-gong.mp3',
  end: '/timer-sounds/end-gong.mp3'
}

// Color palette for version pills - each version gets a different color
const VERSION_COLORS = [
  { bg: 'bg-blue-600', border: 'border-blue-400', text: 'text-white' },
  { bg: 'bg-green-600', border: 'border-green-400', text: 'text-white' },
  { bg: 'bg-purple-600', border: 'border-purple-400', text: 'text-white' },
  { bg: 'bg-orange-600', border: 'border-orange-400', text: 'text-white' },
  { bg: 'bg-pink-600', border: 'border-pink-400', text: 'text-white' },
  { bg: 'bg-indigo-600', border: 'border-indigo-400', text: 'text-white' },
  { bg: 'bg-teal-600', border: 'border-teal-400', text: 'text-white' },
  { bg: 'bg-red-600', border: 'border-red-400', text: 'text-white' },
  { bg: 'bg-yellow-600', border: 'border-yellow-400', text: 'text-black' },
  { bg: 'bg-cyan-600', border: 'border-cyan-400', text: 'text-white' },
  { bg: 'bg-emerald-600', border: 'border-emerald-400', text: 'text-white' },
  { bg: 'bg-rose-600', border: 'border-rose-400', text: 'text-white' },
  { bg: 'bg-violet-600', border: 'border-violet-400', text: 'text-white' },
  { bg: 'bg-amber-600', border: 'border-amber-400', text: 'text-black' },
  { bg: 'bg-lime-600', border: 'border-lime-400', text: 'text-black' },
  { bg: 'bg-sky-600', border: 'border-sky-400', text: 'text-white' }
]

function TimerPage() {
  const [timeLeft, setTimeLeft] = useState(8 * 60) // 8 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timerVersion, setTimerVersion] = useState('v1.1.3')
  const [timerReleaseDate, setTimerReleaseDate] = useState('2025-08-27 11:45:00')
  const startTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastGongTimeRef = useRef<number | null>(null)

  // Function to get consistent color for a version
  const getVersionColor = useCallback((version: string) => {
    // Extract version number and convert to index
    const versionMatch = version.match(/v?(\d+)\.(\d+)\.(\d+)/)
    if (!versionMatch) return VERSION_COLORS[0] // Default color
    
    const major = parseInt(versionMatch[1])
    const minor = parseInt(versionMatch[2])
    const patch = parseInt(versionMatch[3])
    
    // Create a hash-like number from version components
    const versionHash = (major * 10000 + minor * 100 + patch) % VERSION_COLORS.length
    
    return VERSION_COLORS[versionHash]
  }, [])

  // Simple audio play function
  const playGong = useCallback((type: keyof typeof GONG_SOUNDS) => {
    const audio = new Audio(GONG_SOUNDS[type])
    audio.volume = 0.6
    audio.play().catch(error => {
      console.warn(`Could not play gong ${type}:`, error)
    })
  }, [])

  // Load version information from VERSION.json
  useEffect(() => {
    fetch(`/VERSION.json?v=${Date.now()}`)
      .then(response => response.json())
      .then(data => {
        setTimerVersion(`v${data.version}`)
        setTimerReleaseDate(data.timestamp)
      })
      .catch(error => {
        console.warn('Failed to load version info:', error)
        // Fallback to hardcoded values if fetch fails
      })
  }, [])

  // Simple timer logic using timestamps for accuracy
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now()
      }

      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current!) / 1000)
        const newTimeLeft = Math.max(0, 8 * 60 - elapsed)
        
        setTimeLeft(newTimeLeft)
        
        // Play gongs at specific times (only once per time)
        if (newTimeLeft > 0 && newTimeLeft % 60 === 0 && lastGongTimeRef.current !== newTimeLeft) {
          playGong('minute') // Every minute
          lastGongTimeRef.current = newTimeLeft
        }
        if (newTimeLeft === 4 * 60 && lastGongTimeRef.current !== newTimeLeft) {
          playGong('middle') // At 4 minutes
          lastGongTimeRef.current = newTimeLeft
        }
        if (newTimeLeft === 0 && lastGongTimeRef.current !== newTimeLeft) {
          playGong('end') // Timer finished
          lastGongTimeRef.current = newTimeLeft
          setIsCompleted(true)
          setIsRunning(false)
          startTimeRef.current = null
        }
      }, 100) // Check every 100ms for accuracy

    return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, timeLeft, playGong])

  // Set simple title
  useEffect(() => {
    document.title = 'Stretch Timer'
    return () => {
      document.title = 'Bru Mas Ribera - Frontend & UX Engineer'
    }
  }, [])


  // Simple timer control functions
  const startTimer = () => {
    if (timeLeft === 0) return
    setIsRunning(true)
    setIsCompleted(false)
    startTimeRef.current = Date.now()
    lastGongTimeRef.current = null // Reset gong tracking
  }

  const stopTimer = () => {
    setIsRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const restartTimer = () => {
    stopTimer()
    setTimeLeft(8 * 60)
    setIsCompleted(false)
    startTimeRef.current = null
    lastGongTimeRef.current = null // Reset gong tracking
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center">
        {/* Timer Display */}
        <div className="text-8xl font-light text-gray-300 mb-8 font-mono tracking-wider">
          {formatTime(timeLeft)}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-6 justify-center">
          {!isRunning && timeLeft > 0 && !isCompleted && (
            <button
              onClick={startTimer}
              className="w-16 h-16 bg-gray-700 text-gray-200 rounded-full font-medium hover:bg-gray-600 transition-all duration-200 flex items-center justify-center"
              title="Start"
            >
              <div className="w-0 h-0 border-l-[16px] border-l-gray-200 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
            </button>
          )}
          
          {isRunning && (
            <button
              onClick={stopTimer}
              className="w-16 h-16 bg-gray-700 text-gray-200 rounded-full font-medium hover:bg-gray-600 transition-all duration-200 flex items-center justify-center gap-1"
              title="Pause"
            >
              <div className="w-1.5 h-6 bg-gray-200 rounded-sm"></div>
              <div className="w-1.5 h-6 bg-gray-200 rounded-sm"></div>
            </button>
          )}
          
          <button
              onClick={restartTimer}
              className="w-16 h-16 bg-gray-800 text-gray-200 rounded-full font-medium hover:bg-gray-700 transition-all duration-200 flex items-center justify-center text-3xl"
              title="Reset"
            >
              ↺
            </button>
        </div>





        {/* Version Pill */}
        <div className="mt-6 text-center">
          <span className={`inline-block ${getVersionColor(timerVersion).bg} ${getVersionColor(timerVersion).text} text-sm px-4 py-2 rounded-lg font-mono border-2 ${getVersionColor(timerVersion).border} shadow-lg`}>
            🚀 {timerVersion} • {timerReleaseDate}
          </span>
        </div>
      </div>
         </div>
   )
 }

// Export the timer page
export default TimerPage