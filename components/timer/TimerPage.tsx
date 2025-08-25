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
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

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
          
          const audio = new Audio(src)
          audio.preload = 'auto'
          audio.volume = 1.0
          audioRefs.current[key] = audio
          
          // Handle audio loading errors silently
          audio.addEventListener('error', () => {
            // Silent error handling
          });

          // Handle successful loading silently
          audio.addEventListener('canplaythrough', () => {
            // Audio loaded successfully
          });

          // Handle audio interruptions silently
          audio.addEventListener('pause', () => {
            // Audio paused by system
          });

          audio.addEventListener('play', () => {
            // Audio resumed playing
          });
          
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
      
      // Cleanup audio elements
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause()
        audio.src = ''
      })
      audioRefs.current = {};
    }
  }, [])

  // Resume interrupted audio when app regains focus
  const resumeInterruptedAudio = useCallback(() => {
    // Only resume audio if component is still mounted
    if (!audioRefs.current || Object.keys(audioRefs.current).length === 0) {
      return;
    }
    
    Object.entries(audioRefs.current).forEach(([key, audio]) => {
      if (audio.paused && audio.currentTime > 0 && audio.currentTime < audio.duration) {
        audio.play().catch(() => {
          // Silent error handling
        });
      }
    });
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
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [resumeInterruptedAudio])

  // Play gong sound
  const playGong = (type: keyof typeof GONG_SOUNDS) => {
    const audio = audioRefs.current[type]
    if (audio) {
      try {
        audio.currentTime = 0
        audio.volume = 1.0
        
        const playPromise = audio.play()
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Silent error handling for audio play issues
          })
        }
      } catch (error) {
        // Silent error handling
      }
    }
  }

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1
          
          // Play minute gong every minute
          if (newTime > 0 && newTime % 60 === 0) {
            playGong('minute')
          }
          
          // Play middle gong at 4 minutes (middle point)
          if (newTime === 4 * 60) {
            playGong('middle')
          }
          
          return newTime
        })
      }, 1000)
    } else if (timeLeft === 0 && !isCompleted) {
      setIsCompleted(true)
      setIsRunning(false)
      playGong('end') // Play end gong when timer completes
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, isCompleted])

  const startTimer = () => {
    if (timeLeft === 0) return
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
      </div>
         </div>
   )
 }

// Export the timer page
export default TimerPage