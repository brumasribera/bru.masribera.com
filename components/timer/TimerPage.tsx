import { useState, useEffect, useRef, useCallback } from 'react'

// Use public folder assets for simplest pathing
const GONG_SOUNDS = {
  start: '/timer-sounds/start-gong.mp3',
  middle: '/timer-sounds/middle-gong.mp3', // Use dedicated middle gong file
  minute: '/timer-sounds/1m-gong.mp3',
  end: '/timer-sounds/end-gong.mp3'
}

function TimerPage() {
  const [timeLeft, setTimeLeft] = useState(8 * 60) // 8 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const startTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})
  const wasOtherAudioPlayingRef = useRef(false)
  const previousAudioStateRef = useRef<{ [key: string]: any }>({})

  // Set page title and timer-specific manifest
  useEffect(() => {
    // Set title immediately and multiple times to ensure it's used
    document.title = 'Stretch Timer';
     
    // Force title update after a short delay to ensure it's applied
    setTimeout(() => {
      document.title = 'Stretch Timer';
    }, 100);

    // Set timer-specific manifest
    const manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
    if (manifestLink) {
      manifestLink.href = '/tools/timer/manifest.webmanifest';
    } else {
      const link = document.createElement('link');
      link.rel = 'manifest';
      link.href = '/tools/timer/manifest.webmanifest';
      document.head.appendChild(link);
    }

    // Set timer-specific favicon
    const faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (faviconLink) {
      faviconLink.href = '/favicons/favicon-timer.svg';
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = '/favicons/favicon-timer.svg';
      document.head.appendChild(link);
    }

    // Cleanup on unmount - restore original manifest and favicon
    return () => {
      const manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
      if (manifestLink) {
        manifestLink.href = '/site.webmanifest';
      }
      
      const faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (faviconLink) {
        faviconLink.href = '/favicon.ico';
      }
    };
  }, []);

  // Preload audio files on component mount
  useEffect(() => {
    Object.entries(GONG_SOUNDS).forEach(([key, src]) => {
      const audio = new Audio(src)
      audio.preload = 'auto'
      audio.load()
      audioRefs.current[key] = audio
    })

    // Cleanup audio on unmount
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause()
        audio.src = ''
      })
    }
  }, [])

  // Android-compatible audio play function that preserves other audio
  const playGong = useCallback(async (gongType: string) => {
    const audio = audioRefs.current[gongType]
    if (!audio) return

    try {
      // Check if other audio is playing before we play our gong
      const mediaElements = document.querySelectorAll('audio, video')
      wasOtherAudioPlayingRef.current = false
      
      mediaElements.forEach((element: any) => {
        if (element !== audio && !element.paused) {
          wasOtherAudioPlayingRef.current = true
          // Store the current state but don't pause
          previousAudioStateRef.current[element.src || element.currentSrc] = {
            currentTime: element.currentTime,
            volume: element.volume,
            playbackRate: element.playbackRate
          }
        }
      })

      // Reset audio to beginning and play
      audio.currentTime = 0
      audio.volume = 0.7
      
      // Use a promise-based approach for better cross-platform compatibility
      const playPromise = audio.play()
      
      if (playPromise !== undefined) {
        await playPromise
          .then(() => {
            console.log(`${gongType} gong played successfully`)
          })
          .catch((error) => {
            console.log(`Audio play failed for ${gongType}:`, error)
            // Try alternative approach for Android
            setTimeout(() => {
              try {
                audio.play()
              } catch (e) {
                // Silent fallback
              }
            }, 100)
          })
      }
    } catch (error) {
      // Silent error handling
    }
  }, [])

  // Precise timer logic using Date.now()
  useEffect(() => {
    if (isRunning && timeLeft > 0 && startTimeRef.current) {
      intervalRef.current = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - startTimeRef.current!) / 1000)
        const newTimeLeft = Math.max(0, (8 * 60) - elapsed)
        
        // Check for minute marks for gong sounds
        const prevTime = timeLeft
        if (newTimeLeft !== prevTime) {
          // Play minute gong every minute
          if (newTimeLeft > 0 && newTimeLeft % 60 === 0 && newTimeLeft !== 8 * 60) {
            playGong('minute')
          }
          
          // Play middle gong at 4 minutes (middle point)
          if (newTimeLeft === 4 * 60) {
            playGong('middle')
          }
        }
        
        setTimeLeft(newTimeLeft)
        
        if (newTimeLeft === 0) {
          setIsCompleted(true)
          setIsRunning(false)
          playGong('end') // Play end gong when timer completes
        }
      }, 100) // Update every 100ms for more precise timing
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, playGong])

  const startTimer = () => {
    if (timeLeft === 0) return
    
    startTimeRef.current = Date.now()
    setIsRunning(true)
    setIsCompleted(false)
    
    if (timeLeft === 8 * 60) {
      playGong('start') // Play start gong when starting fresh
    }
  }

  const stopTimer = () => {
    setIsRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const restartTimer = () => {
    stopTimer()
    setTimeLeft(8 * 60)
    setIsCompleted(false)
    setIsRunning(false)
    startTimeRef.current = null
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
        <div className="flex gap-4 justify-center">
          {!isRunning ? (
            <button
              onClick={startTimer}
              disabled={timeLeft === 0}
              className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 
                         text-white px-8 py-4 rounded-full text-lg font-medium transition-colors
                         flex items-center justify-center w-20 h-20"
              style={{ zIndex: 10 }}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          ) : (
            <button
              onClick={stopTimer}
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors
                         flex items-center justify-center w-20 h-20"
              style={{ zIndex: 10 }}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          
          <button
            onClick={restartTimer}
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors
                       flex items-center justify-center w-20 h-20"
            style={{ zIndex: 10 }}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {isCompleted && (
          <div className="mt-8 text-2xl text-green-400 font-medium">
            Time's up! Great job stretching! 🎉
          </div>
        )}
      </div>
    </div>
  )
}

export default TimerPage
