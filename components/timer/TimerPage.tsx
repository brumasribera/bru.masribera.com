import { useState, useEffect, useRef, useCallback } from 'react'

// Use public folder assets for simplest pathing
const GONG_SOUNDS = {
  start: '/timer-sounds/start-gong.mp3',
  middle: '/timer-sounds/middle-gong.mp3', // Use dedicated middle gong file
  minute: '/timer-sounds/1m-gong.mp3',
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
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})
  const wasOtherAudioPlayingRef = useRef(false)
  const previousAudioStateRef = useRef<{ [key: string]: any }>({})
  const serviceWorkerRef = useRef<ServiceWorker | null>(null)

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
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Timer service worker registered:', registration);
          
          // Wait for service worker to be ready
          await navigator.serviceWorker.ready;
          serviceWorkerRef.current = registration.active;
          
          // Listen for messages from service worker
          navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
          
        } catch (error) {
          console.error('Timer service worker registration failed:', error);
        }
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
      
      // Remove service worker message listener
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
      }
      
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

  // Handle messages from service worker
  const handleServiceWorkerMessage = useCallback((event: MessageEvent) => {
    if (event.data && event.data.type === 'TIMER_UPDATE') {
      setTimeLeft(event.data.timeLeft);
      setIsRunning(event.data.isRunning);
      setIsCompleted(event.data.isCompleted);
      
      // Play original MP3 gong sounds when triggered by service worker
      if (event.data.gongType) {
        playGong(event.data.gongType);
      }
    }
  }, [])

  // Communicate with service worker
  const sendToServiceWorker = useCallback((action: string, data?: any) => {
    if (serviceWorkerRef.current) {
      serviceWorkerRef.current.postMessage({
        type: 'TIMER_CONTROL',
        action: action,
        data: data
      });
    }
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
          
          const audio = createNotificationAudio(src)
          
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

          // Handle audio completion to resume other audio
          audio.addEventListener('ended', () => {
            resumeOtherAudio();
          });
          
          audioRefs.current[key] = audio
          
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

  // Check if other audio is currently playing
  const checkOtherAudioPlaying = useCallback(() => {
    // Check if there are any audio elements playing that aren't our timer sounds
    const allAudioElements = document.querySelectorAll('audio');
    let otherAudioPlaying = false;
    
    // Store previous audio state for restoration
    previousAudioStateRef.current = {};
    
    allAudioElements.forEach((audio, index) => {
      if (!audio.hasAttribute('data-timer-audio') && !audio.paused) {
        otherAudioPlaying = true;
        // Store the audio element's state
        previousAudioStateRef.current[`audio_${index}`] = {
          element: audio,
          wasPlaying: true,
          currentTime: audio.currentTime,
          volume: audio.volume
        };
      }
    });
    
    // Also check for video elements with audio
    const allVideoElements = document.querySelectorAll('video');
    allVideoElements.forEach((video, index) => {
      if (!video.paused && video.volume > 0) {
        otherAudioPlaying = true;
        // Store the video element's state
        previousAudioStateRef.current[`video_${index}`] = {
          element: video,
          wasPlaying: true,
          currentTime: video.currentTime,
          volume: video.volume
        };
      }
    });
    
    return otherAudioPlaying;
  }, [])

  // Resume other audio that was interrupted
  const resumeOtherAudio = useCallback(() => {
    if (!wasOtherAudioPlayingRef.current) return;
    
    // Small delay to ensure our audio has fully finished
    setTimeout(() => {
      // Try to restore the specific audio/video that was playing before
      Object.values(previousAudioStateRef.current).forEach((audioState: any) => {
        if (audioState.wasPlaying && audioState.element) {
          try {
            // Try to resume the specific audio/video element
            if (audioState.element.tagName === 'AUDIO' || audioState.element.tagName === 'VIDEO') {
              // Set the time back to where it was
              audioState.element.currentTime = audioState.currentTime;
              audioState.element.volume = audioState.volume;
              
              // Try to resume playback
              const playPromise = audioState.element.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  // Silent error handling - the element might not be resumable
                });
              }
            }
          } catch (error) {
            // Silent error handling
          }
        }
      });
      
      // Try to resume other audio by triggering a user interaction
      // This is a workaround for Android's audio focus management
      const resumeEvent = new Event('resume-audio', { bubbles: true });
      document.dispatchEvent(resumeEvent);
      
      // Try to restore MediaSession to help other apps regain audio focus
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'none';
        // Clear metadata to release any remaining audio focus
        navigator.mediaSession.metadata = null;
      }
      
      // Dispatch additional events to help restore audio state
      window.dispatchEvent(new Event('focus'));
      document.dispatchEvent(new Event('visibilitychange'));
      
      wasOtherAudioPlayingRef.current = false;
      // Clear the stored state
      previousAudioStateRef.current = {};
    }, 100);
  }, [])

  // Enhanced Android audio focus management
  const setupAndroidAudioFocus = useCallback(() => {
    if ('mediaSession' in navigator) {
      // Set up MediaSession to indicate we don't want audio focus
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Timer Gong',
        artist: 'Stretch Timer',
        album: 'Meditation Sounds'
      });
      
      // Set playback state to none to avoid taking audio focus
      navigator.mediaSession.playbackState = 'none';
      
      // Set action handlers that do nothing to prevent audio focus conflicts
      navigator.mediaSession.setActionHandler('play', () => {});
      navigator.mediaSession.setActionHandler('pause', () => {});
      navigator.mediaSession.setActionHandler('stop', () => {});
      navigator.mediaSession.setActionHandler('seekbackward', () => {});
      navigator.mediaSession.setActionHandler('seekforward', () => {});
      navigator.mediaSession.setActionHandler('seekto', () => {});
      navigator.mediaSession.setActionHandler('previoustrack', () => {});
      navigator.mediaSession.setActionHandler('nexttrack', () => {});
    }
  }, [])

  // Most intelligent Android audio focus approach
  const setupIntelligentAudioFocus = useCallback(() => {
    if ('mediaSession' in navigator) {
      // Set up MediaSession to indicate we don't want audio focus
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Timer Gong',
        artist: 'Stretch Timer',
        album: 'Meditation Sounds'
      });
      
      // Set playback state to none to avoid taking audio focus
      navigator.mediaSession.playbackState = 'none';
      
      // Set action handlers that do nothing to prevent audio focus conflicts
      navigator.mediaSession.setActionHandler('play', () => {});
      navigator.mediaSession.setActionHandler('pause', () => {});
      navigator.mediaSession.setActionHandler('stop', () => {});
      navigator.mediaSession.setActionHandler('seekbackward', () => {});
      navigator.mediaSession.setActionHandler('seekforward', () => {});
      navigator.mediaSession.setActionHandler('seekto', () => {});
      navigator.mediaSession.setActionHandler('previoustrack', () => {});
      navigator.mediaSession.setActionHandler('nexttrack', () => {});
      
      // Try to set audio focus to TRANSIENT_MAY_DUCK if supported
      // This tells Android we want minimal audio focus for notification sounds
      if ('setAudioFocusRequest' in navigator.mediaSession) {
        try {
          (navigator.mediaSession as any).setAudioFocusRequest({
            audioFocusRequestType: 'transient_may_duck'
          });
        } catch (error) {
          // Fallback if not supported
        }
      }
    }
  }, [])

  // Create notification-style audio that doesn't steal audio focus
  const createNotificationAudio = useCallback((src: string) => {
    // Create a very short, notification-style audio element
    const audio = new Audio(src);
    
    // Set properties to make it behave like a notification sound
    audio.preload = 'auto';
    audio.volume = 0.5; // Lower volume to be less intrusive
    audio.loop = false;
    
    // Set audio attributes to prevent taking audio focus on Android
    audio.setAttribute('data-timer-audio', 'true');
    audio.setAttribute('data-notification-style', 'true');
    
    // Make the audio very short by setting a maximum duration
    // This helps Android treat it as a notification rather than media
    audio.addEventListener('loadedmetadata', () => {
      if (audio.duration > 3) { // If longer than 3 seconds, trim it
        audio.addEventListener('timeupdate', () => {
          if (audio.currentTime >= 3) {
            audio.pause();
            audio.currentTime = 0;
          }
        });
      }
    });
    
    return audio;
  }, [])

  // Most effective approach: Use Web Audio API for notification-style sounds
  const playNotificationSound = useCallback((src: string) => {
    try {
      // Create audio context for notification-style playback
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Fetch and decode the audio file
      fetch(src)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
          // Create a very short, notification-style sound
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          
          // Create a gain node to control volume
          const gainNode = audioContext.createGain();
          gainNode.gain.setValueAtTime(0.4, audioContext.currentTime); // Low volume
          
          // Connect the nodes
          source.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Resume audio context if suspended
          if (audioContext.state === 'suspended') {
            audioContext.resume();
          }
          
          // Play the sound
          source.start(0);
          
          // Stop after a short duration to make it notification-like
          source.stop(audioContext.currentTime + Math.min(audioBuffer.duration, 2));
          
          // Clean up
          setTimeout(() => {
            audioContext.close();
          }, 3000);
        })
        .catch(() => {
          // Fallback to regular audio if Web Audio API fails
          audioContext.close();
        });
    } catch (error) {
      // Fallback to regular audio
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



  // Play gong sound with audio session management
  const playGong = (type: keyof typeof GONG_SOUNDS) => {
    const src = GONG_SOUNDS[type];
    
    try {
      // Check if other audio is playing before we start
      if (!wasOtherAudioPlayingRef.current) {
        wasOtherAudioPlayingRef.current = checkOtherAudioPlaying();
      }
      
      // Use the most effective approach: Web Audio API for notification-style sounds
      playNotificationSound(src);
      
      // Also try to play the regular audio as a fallback
      const audio = audioRefs.current[type];
      if (audio) {
        // Set up the most intelligent Android audio focus management
        setupIntelligentAudioFocus();
        
        // Set audio properties for minimal interruption
        audio.currentTime = 0;
        audio.volume = 0.4; // Lower volume for notification-style behavior
        
        // Try to play audio as a notification sound
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            // Audio started playing successfully
            // Immediately set MediaSession to none to release audio focus
            if ('mediaSession' in navigator) {
              navigator.mediaSession.playbackState = 'none';
              // Clear metadata to help release audio focus faster
              setTimeout(() => {
                if ('mediaSession' in navigator) {
                  navigator.mediaSession.metadata = null;
                }
              }, 100);
            }
          }).catch((error) => {
            // Silent error handling for audio play issues
          })
        }
      }
    } catch (error) {
      // Silent error handling
    }
  }

  // High-precision timer logic using performance.now()
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const animate = (currentTime: number) => {
        // This effect is now primarily for sending updates to the service worker
        // and triggering gongs based on service worker messages.
        // The main timer logic is handled by the service worker.
        
        // Send current timer state to service worker
        sendToServiceWorker('TIMER_SYNC', {
          timeLeft: timeLeft,
          isRunning: isRunning,
          isCompleted: isCompleted
        });
        
        // Play minute gong every minute
        if (timeLeft > 0 && timeLeft % 60 === 0 && !isCompleted) {
          playGong('minute');
        }
        
        // Play middle gong at 4 minutes (middle point)
        if (timeLeft === 4 * 60 && !isCompleted) {
          playGong('middle');
        }
        
        // If timer completed, send notification and stop
        if (timeLeft === 0 && !isCompleted) {
          setIsCompleted(true);
          setIsRunning(false);
          playGong('end');
  
          sendToServiceWorker('TIMER_SYNC', {
            timeLeft: 0,
            isRunning: false,
            isCompleted: true
          });
        }
      };
      
      // Request an animation frame to start the loop
      // This ensures the service worker receives the initial state
      requestAnimationFrame(animate);
    } else if (timeLeft === 0 && !isCompleted) {
      // If timeLeft is 0 and not completed, it means the service worker
      // has sent a final update, so we just set isCompleted and play end gong.
      setIsCompleted(true);
      setIsRunning(false);
      playGong('end');
      
      sendToServiceWorker('TIMER_SYNC', {
        timeLeft: 0,
        isRunning: false,
        isCompleted: true
      });
    }

    return () => {
      // No cleanup needed here as the service worker handles the animation frame
    };
  }, [isRunning, timeLeft, isCompleted, sendToServiceWorker, playGong])

  // Handle visibility changes to compensate for background throttling
  useEffect(() => {
    const handleVisibilityChange = () => {
      // This effect is now primarily for sending updates to the service worker
      // to inform it of visibility changes.
      sendToServiceWorker('VISIBILITY_CHANGE', {
        isVisible: !document.hidden
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [sendToServiceWorker])

  // Add page focus/blur handling for better background detection
  useEffect(() => {
    const handleFocus = () => {
      // This effect is now primarily for sending updates to the service worker
      // to inform it of page focus.
      sendToServiceWorker('PAGE_FOCUS');
    };

    const handleBlur = () => {
      // This effect is now primarily for sending updates to the service worker
      // to inform it of page blur.
      sendToServiceWorker('PAGE_BLUR');
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    }
  }, [sendToServiceWorker])

  const startTimer = () => {
    if (timeLeft === 0) return
    setIsRunning(true)
    setIsCompleted(false)
    sendToServiceWorker('START')
  }

  const stopTimer = () => {
    setIsRunning(false)
    sendToServiceWorker('STOP')
  }

  const restartTimer = () => {
    stopTimer()
    setTimeLeft(8 * 60)
    setIsCompleted(false)
    sendToServiceWorker('RESET')
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