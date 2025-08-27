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
  const wasOtherAudioPlayingRef = useRef(false)
  const previousAudioStateRef = useRef<{ [key: string]: any }>({})

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

  // Check if other audio is playing and store state for restoration
  const checkOtherAudioPlaying = useCallback(() => {
    const allAudioElements = document.querySelectorAll('audio')
    let otherAudioPlaying = false
    
    // Store previous audio state for restoration
    previousAudioStateRef.current = {}
    
    allAudioElements.forEach((audio, index) => {
      if (!audio.hasAttribute('data-timer-audio') && !audio.paused) {
        otherAudioPlaying = true
        // Store the audio element's state
        previousAudioStateRef.current[`audio_${index}`] = {
          element: audio,
          wasPlaying: true,
          currentTime: audio.currentTime,
          volume: audio.volume
        }
      }
    })
    
    // Also check for video elements with audio
    const allVideoElements = document.querySelectorAll('video')
    allVideoElements.forEach((video, index) => {
      if (!video.paused && video.volume > 0) {
        otherAudioPlaying = true
        // Store the video element's state
        previousAudioStateRef.current[`video_${index}`] = {
          element: video,
          wasPlaying: true,
          currentTime: video.currentTime,
          volume: video.volume
        }
      }
    })
    
    return otherAudioPlaying
  }, [])

  // Resume other audio that was interrupted
  const resumeOtherAudio = useCallback(() => {
    if (!wasOtherAudioPlayingRef.current) return
    
    // Small delay to ensure our audio has fully finished
    setTimeout(() => {
      // Try to restore the specific audio/video that was playing before
      Object.values(previousAudioStateRef.current).forEach((audioState: any) => {
        if (audioState.wasPlaying && audioState.element) {
          try {
            // Try to resume the specific audio/video element
            if (audioState.element.tagName === 'AUDIO' || audioState.element.tagName === 'VIDEO') {
              // Set the time back to where it was
              audioState.element.currentTime = audioState.currentTime
              audioState.element.volume = audioState.volume
              
              // Try to resume playback
              const playPromise = audioState.element.play()
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  // Silent error handling - the element might not be resumable
                })
              }
            }
          } catch (error) {
            // Silent error handling
          }
        }
      })
      
      // Try to restore MediaSession to help other apps regain audio focus
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'none'
        // Clear metadata to release any remaining audio focus
        navigator.mediaSession.metadata = null
      }
      
      wasOtherAudioPlayingRef.current = false
      // Clear the stored state
      previousAudioStateRef.current = {}
    }, 100)
  }, [])

  // Create notification-style audio that doesn't steal audio focus
  const createNotificationAudio = useCallback((src: string) => {
    // Create a notification-style audio element
    const audio = new Audio(src)
    
    // Set properties to make it behave like a notification sound
    audio.preload = 'auto'
    audio.volume = 0.5 // Lower volume to be less intrusive
    audio.loop = false
    
    // Set audio attributes to prevent taking audio focus on Android
    audio.setAttribute('data-timer-audio', 'true')
    audio.setAttribute('data-notification-style', 'true')
    
    return audio
  }, [])

  // Setup MediaSession to avoid taking audio focus
  const setupIntelligentAudioFocus = useCallback(() => {
    if ('mediaSession' in navigator) {
      // Set up MediaSession to indicate we don't want audio focus
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Timer Gong',
        artist: 'Stretch Timer',
        album: 'Meditation Sounds'
      })
      
      // Set playback state to none to avoid taking audio focus
      navigator.mediaSession.playbackState = 'none'
      
      // Set action handlers that do nothing to prevent audio focus conflicts
      navigator.mediaSession.setActionHandler('play', () => {})
      navigator.mediaSession.setActionHandler('pause', () => {})
      navigator.mediaSession.setActionHandler('stop', () => {})
      navigator.mediaSession.setActionHandler('seekbackward', () => {})
      navigator.mediaSession.setActionHandler('seekforward', () => {})
      navigator.mediaSession.setActionHandler('seekto', () => {})
      navigator.mediaSession.setActionHandler('previoustrack', () => {})
      navigator.mediaSession.setActionHandler('nexttrack', () => {})
    }
  }, [])

    // Android-friendly audio play function
  const playGong = useCallback((type: keyof typeof GONG_SOUNDS) => {
    // Check if other audio is playing before we play our sound
    wasOtherAudioPlayingRef.current = checkOtherAudioPlaying()
    
    // Setup MediaSession to avoid audio focus conflicts
    setupIntelligentAudioFocus()
    
    // Create notification-style audio
    const audio = createNotificationAudio(GONG_SOUNDS[type])
    
    // Play immediately
    audio.play().then(() => {
      // Auto-cleanup and resume other audio after our sound finishes naturally
      audio.addEventListener('ended', () => {
        resumeOtherAudio()
        audio.src = '' // Release the audio resource
      }, { once: true })
      
      // Fallback cleanup after 6 seconds (allowing full 5s + 1s buffer)
      setTimeout(() => {
        if (!audio.ended) {
          audio.pause()
          audio.currentTime = 0
          resumeOtherAudio()
          audio.src = ''
        }
      }, 6000)
    }).catch(error => {
      console.warn(`Could not play gong ${type}:`, error)
      resumeOtherAudio() // Resume other audio even if our sound failed
    })
  }, [checkOtherAudioPlaying, setupIntelligentAudioFocus, createNotificationAudio, resumeOtherAudio])

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