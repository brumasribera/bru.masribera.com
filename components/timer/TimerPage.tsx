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
  const [timerVersion, setTimerVersion] = useState('v1.1.9')
  const [timerReleaseDate, setTimerReleaseDate] = useState('28 Thursday August 16:59')
  
  // Use absolute timestamps for accurate timing
  const startTimeRef = useRef<number | null>(null)
  const endTimeRef = useRef<number | null>(null)
  const gongScheduleRef = useRef<{ [key: string]: number }>({})
  const lastGongCheckRef = useRef<number>(0)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Web Audio API references
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const gongBuffersRef = useRef<{ [key: string]: AudioBuffer }>({})

  // Initialize Web Audio API system
  const initGongSystem = useCallback(async () => {
    try {
      // Create audio context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create gain node with lower volume to reduce Android audio interruption
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = 0.3; // Lower volume to reduce Android ducking
      
      // Connect gain node to destination
      gainNodeRef.current.connect(audioContextRef.current.destination);
      
      console.log('Web Audio API system initialized');
    } catch (error) {
      console.error('Failed to initialize Web Audio API:', error);
    }
  }, [])

  // Decode audio file using Web Audio API
  const decodeAudioFile = useCallback(async (src: string): Promise<AudioBuffer | null> => {
    if (!audioContextRef.current) {
      await initGongSystem();
    }
    
    if (!audioContextRef.current) {
      console.error('Audio context not available');
      return null;
    }
    
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`Failed to fetch audio: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current!.decodeAudioData(arrayBuffer);
      
      return audioBuffer;
    } catch (error) {
      console.error(`Failed to decode audio file ${src}:`, error);
      return null;
    }
  }, [initGongSystem])

    // Load version information from VERSION.json automatically
  useEffect(() => {
    const loadVersionInfo = async () => {
      try {
        const response = await fetch(`/VERSION.json?v=${Date.now()}`)
        const data = await response.json()
        
        // Format the date from the timestamp, converting UTC to local timezone
        const date = new Date(data.timestamp + ' UTC') // Treat as UTC and convert to local
        const day = date.getDate()
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
        const month = date.toLocaleDateString('en-US', { month: 'long' })
        const time = date.toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit'
        })
        
        setTimerVersion(`v${data.version}`)
        setTimerReleaseDate(`${day} ${weekday} ${month} ${time}`)
      } catch (error) {
        console.warn('Failed to load version info:', error)
        // Keep fallback values if fetch fails
      }
    }
    
    loadVersionInfo()
  }, [])

  // Set page title and timer-specific manifest
  useEffect(() => {
    // Set title immediately and multiple times to ensure it's used
    document.title = 'Stretch Timer';
    
    // Force title update after a short delay to ensure it's applied
    setTimeout(() => {
      document.title = 'Stretch Timer';
    }, 100);
    
    // Set title again when the page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        document.title = 'Stretch Timer';
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Set the timer-specific manifest for PWA installation
    const setTimerManifest = () => {
      // Remove any existing manifest links first
      const existingManifests = document.querySelectorAll("link[rel='manifest']");
      existingManifests.forEach(manifest => manifest.remove());
      
      // Create a new manifest link for the timer
      const timerManifest = document.createElement('link');
      timerManifest.rel = 'manifest';
      timerManifest.href = `/tools/timer/manifest.webmanifest?v=${Date.now()}`;
      timerManifest.setAttribute('data-timer-manifest', 'true');
      document.head.appendChild(timerManifest);
      
      // Debug: log the manifest change
      console.log('Timer manifest set to:', timerManifest.href);
      console.log('Current path:', window.location.pathname);
    };
    
    setTimerManifest();
    
    // Add PWA meta tags for better installation experience
    const addPWAMetaTags = () => {
      const metaTags = [
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Stretch Timer' },
        { name: 'application-name', content: 'Stretch Timer' },
        { name: 'msapplication-TileColor', content: '#000000' },
        { name: 'msapplication-config', content: '/browserconfig.xml' },
        { name: 'name', content: 'Stretch Timer' },
        { name: 'title', content: 'Stretch Timer' }
      ];
      
      metaTags.forEach(tag => {
        const existingMeta = document.querySelector(`meta[name="${tag.name}"]`);
        if (!existingMeta) {
          const meta = document.createElement('meta');
          meta.name = tag.name;
          meta.content = tag.content;
          document.head.appendChild(meta);
        }
      });
    };
    
    addPWAMetaTags();
    
    // Register service worker for PWA functionality
    const registerServiceWorker = () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('Timer service worker registered:', registration);
            
            // Check if service worker needs update
            if (registration.waiting) {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
            
            // Force update if version changed
            registration.active?.postMessage({ 
              type: 'VERSION_CHECK', 
              version: '1.1.7' 
            });
          })
          .catch((error) => {
            console.error('Timer service worker registration failed:', error);
          });
      }
    };
    
    registerServiceWorker();
    
    // Cleanup function to restore original manifest and remove meta tags
    return () => {
      // Remove timer manifest and restore original
      const timerManifest = document.querySelector("link[data-timer-manifest='true']");
      if (timerManifest) {
        timerManifest.remove();
      }
      
      // Restore the original site manifest
      const originalManifest = document.createElement('link');
      originalManifest.rel = 'manifest';
      originalManifest.href = '/site.webmanifest';
      document.head.appendChild(originalManifest);
      
      console.log('Restored original manifest:', originalManifest.href);
      
      // Remove PWA meta tags
      const pwaMetaTags = [
        'mobile-web-app-capable',
        'apple-mobile-web-app-capable',
        'apple-mobile-web-app-status-bar-style',
        'apple-mobile-web-app-title',
        'application-name',
        'msapplication-TileColor',
        'msapplication-config'
      ];
      
      pwaMetaTags.forEach(name => {
        const meta = document.querySelector(`meta[name="${name}"]`);
        if (meta) {
          meta.remove();
        }
      });
      
      // Restore original title
      document.title = 'Bru Mas Ribera - Frontend & UX Engineer';
      
      // Remove visibility change listener
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Unregister service worker to prevent conflicts
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            if (registration.scope.includes('/tools/timer')) {
              registration.unregister();
              console.log('Timer service worker unregistered');
            }
          });
        });
      }
    };
  }, [])

  // Initialize audio elements and set timer favicon
  useEffect(() => {
    // Set the timer favicon
    const setTimerFavicon = () => {
      const existingLink = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (existingLink) {
        // Store original favicon to restore later
        if (!existingLink.dataset.originalHref) {
          existingLink.dataset.originalHref = existingLink.href;
        }
        existingLink.href = '/favicons/favicon-timer.svg';
      } else {
        const link = document.createElement('link');
        link.type = 'image/svg+xml';
        link.rel = 'icon';
        link.href = '/favicons/favicon-timer.svg';
        document.head.appendChild(link);
      }
    };

    setTimerFavicon();

    let isMounted = true;
    
    const loadAudioFiles = async () => {
      for (const [key, src] of Object.entries(GONG_SOUNDS)) {
        if (!isMounted) break;
        
        try {
          // Check if file is accessible
          const response = await fetch(src);
          if (!response.ok) {
            continue;
          }
          
          if (!isMounted) break;
          
          // Decode audio file using Web Audio API
          const audioBuffer = await decodeAudioFile(src);
          if (audioBuffer) {
            gongBuffersRef.current[key] = audioBuffer;
          }
          
        } catch (error) {
          // Silent error handling
        }
      }
    };
    
    loadAudioFiles();

    return () => {
      isMounted = false;
      
      // Restore original favicon
      const timerLink = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (timerLink && timerLink.dataset.originalHref) {
        timerLink.href = timerLink.dataset.originalHref;
        delete timerLink.dataset.originalHref;
      } else if (timerLink && timerLink.href.includes('favicon-timer')) {
        // Fallback: restore to default favicon
        timerLink.href = '/favicon.ico';
      }
      
              // Cleanup Web Audio API resources
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        gainNodeRef.current = null;
        gongBuffersRef.current = {};
    }
  }, [])











  // Resume interrupted audio when app regains focus
  const resumeInterruptedAudio = useCallback(() => {
    // Only resume audio if component is still mounted
    if (!gongBuffersRef.current || Object.keys(gongBuffersRef.current).length === 0) {
      return;
    }
    
    // For Web Audio API, we just ensure the context is resumed if it was suspended
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, [])

  // Handle app focus and resume interrupted audio
  useEffect(() => {
    const handleFocus = () => {
      // App regained focus, check for interrupted audio
      resumeInterruptedAudio();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // App became visible again, resume interrupted audio
        resumeInterruptedAudio();
        
        // Update timer immediately when app becomes visible to ensure accuracy
        if (isRunning && startTimeRef.current && endTimeRef.current) {
          const now = Date.now()
          const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000))
          setTimeLeft(remaining)
          
          // Check if timer completed while in background
          if (remaining === 0 && !isCompleted) {
            setIsCompleted(true)
            setIsRunning(false)
            playGong('end')
          }
        }
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [resumeInterruptedAudio, isRunning, isCompleted])

  // Play gong sound using Web Audio API
  const playGong = useCallback((type: keyof typeof GONG_SOUNDS) => {
    if (!audioContextRef.current || !gainNodeRef.current) {
      console.warn('Audio system not initialized');
      return;
    }
    
    const audioBuffer = gongBuffersRef.current[type];
    if (!audioBuffer) {
      console.warn(`Audio buffer not loaded for ${type}`);
      return;
    }
    
    try {
      // Resume audio context if suspended (important for autoplay policies)
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      
      // Create buffer source
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      
      // Connect source to gain node, then to destination
      source.connect(gainNodeRef.current);
      
      // Play the sound
      source.start(0);
      
      console.log(`Playing ${type} gong`);
    } catch (error) {
      console.error(`Failed to play ${type} gong:`, error);
    }
  }, [])

  // Timestamp-based timer logic for accurate timing on mobile
  useEffect(() => {
    if (isRunning && startTimeRef.current && endTimeRef.current) {
      // Use a more frequent interval for smooth updates
      intervalRef.current = setInterval(() => {
        const now = Date.now()
        const remaining = Math.max(0, Math.ceil((endTimeRef.current! - now) / 1000))
        
        setTimeLeft(remaining)
        
        // Check for gongs based on absolute time
        checkAndPlayGongs(remaining)
        
        // Check if timer completed
        if (remaining === 0 && !isCompleted) {
          setIsCompleted(true)
          setIsRunning(false)
          playGong('end')
        }
      }, 100) // Check every 100ms for smoother countdown
    } else if (timeLeft === 0 && !isCompleted) {
      setIsCompleted(true)
      setIsRunning(false)
      playGong('end')
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, isCompleted])

  // Check and play gongs based on absolute time
  const checkAndPlayGongs = useCallback((remainingSeconds: number) => {
    const now = Date.now()
    
    // Only check gongs every 500ms to avoid spam
    if (now - lastGongCheckRef.current < 500) return
    
    lastGongCheckRef.current = now
    
    // Check start gong (plays after 1 second when timer starts)
    if (remainingSeconds === 7 * 60 - 1) {
      const gongKey = 'start_gong'
      if (!gongScheduleRef.current[gongKey]) {
        gongScheduleRef.current[gongKey] = now
        playGong('start')
      }
    }
    
    // Check middle gong at 4 minutes
    if (remainingSeconds === 4 * 60) {
      const gongKey = 'middle_4min'
      if (!gongScheduleRef.current[gongKey]) {
        gongScheduleRef.current[gongKey] = now
        playGong('middle')
      }
    }
    
    // Check minute gong at every minute mark (but not when other gongs play)
    if (remainingSeconds > 0 && remainingSeconds % 60 === 0) {
      // Don't play minute gong if it's a special minute (4 minutes for middle gong)
      if (remainingSeconds !== 4 * 60) {
        const gongKey = `minute_${remainingSeconds}`
        if (!gongScheduleRef.current[gongKey]) {
          gongScheduleRef.current[gongKey] = now
          playGong('minute')
        }
      }
    }
  }, [])

  const startTimer = () => {
    if (timeLeft === 0) return
    
    const now = Date.now()
    const duration = timeLeft * 1000 // Convert seconds to milliseconds
    
    startTimeRef.current = now
    endTimeRef.current = now + duration
    
    // Clear previous gong schedule
    gongScheduleRef.current = {}
    lastGongCheckRef.current = 0
    
    setIsRunning(true)
    setIsCompleted(false)
    
    // Start gong will be played automatically by checkAndPlayGongs after 1 second
  }

  const stopTimer = () => {
    setIsRunning(false)
    startTimeRef.current = null
    endTimeRef.current = null
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const restartTimer = () => {
    stopTimer()
    setTimeLeft(8 * 60)
    setIsCompleted(false)
    setIsRunning(false)
    
    // Clear gong schedule
    gongScheduleRef.current = {}
    lastGongCheckRef.current = 0
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
          <span className="inline-block bg-purple-600 text-white text-sm px-4 py-2 rounded-lg font-mono border-2 border-purple-400 shadow-lg">
            🚀 {timerVersion} • {timerReleaseDate}
          </span>
        </div>
      </div>
    </div>
  )
}

// Export the timer page
export default TimerPage
