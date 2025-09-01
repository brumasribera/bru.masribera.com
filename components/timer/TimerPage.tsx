import { useState, useEffect, useRef } from 'react'
import { useAudio } from './useAudio'
import { usePWA } from './usePWA'

// ShootingStars Component
function ShootingStars({ active, startTime }: { active: boolean; startTime: number | null }) {
  const [stars, setStars] = useState<{ id: number, left: string, size: number, delay: number, duration: number, rotate: number }[]>([])
  const idRef = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout>()
  const [shouldStop, setShouldStop] = useState(false)

  useEffect(() => {
    if (!active || shouldStop) {
      setStars([])
      clearInterval(intervalRef.current)
      return
    }

    // Check if 5 minutes have passed since start
    if (startTime) {
      const elapsed = Date.now() - startTime
      if (elapsed >= 5 * 60 * 1000) { // 5 minutes in milliseconds
        setShouldStop(true)
        return
      }
    }

    intervalRef.current = setInterval(() => {
      const newStar = {
        id: idRef.current++,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: 0,
        duration: Math.random() * 5 + 3,
        rotate: Math.random() * 20 - 10
      }
      console.log('🌟 Generated star:', newStar)
      setStars((prev) => [
        ...prev.slice(-300), // Limit stars in DOM (doubled again)
        newStar
      ])
    }, 75) // Generate one every 75ms (twice as frequent)

    return () => clearInterval(intervalRef.current)
  }, [active])

  console.log('🌟 ShootingStars render - active:', active, 'stars count:', stars.length)
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10">

      
      {stars.map(star => (
        <div key={star.id}
          className="absolute bg-white opacity-90 rounded-full"
          style={{
            top: '0px',
            left: star.left,
            width: `${star.size * 2}px`,
            height: `${star.size * 2}px`,
            animationDuration: `${star.duration}s`,
            animationName: 'fall',
            animationFillMode: 'forwards',
            animationTimingFunction: 'linear'
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-50px); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

const GONG_TIMES = [420, 360, 300, 240, 180, 120, 60] // seconds

export default function TimerPage() {
  const [time, setTime] = useState(480), [run, setRun] = useState(false), [done, setDone] = useState(false)
  const [gongPlaying, setGongPlaying] = useState(false)
  const [showStars, setShowStars] = useState(false)
  const [starStartTime, setStarStartTime] = useState<number | null>(null)
  const end = useRef(0), int = useRef<NodeJS.Timeout>(), gongs = useRef<Record<string, number>>({})
  const play = useAudio()
  
  usePWA()

  // Check if timer has already finished when component mounts
  useEffect(() => {
    if (end.current && done) {
      const remaining = Math.max(0, Math.ceil((end.current - Date.now()) / 1000))
      if (remaining === 0) {
        setShowStars(true)
      }
    }
  }, [done])

  useEffect(() => {
    if (!run) return
    int.current = setInterval(() => {
      const now = Math.max(0, Math.ceil((end.current - Date.now()) / 1000))
      setTime(now)
      if (now === 0) {
        stop('end')
        setShowStars(true) // Automatically show stars when timer ends
        setStarStartTime(Date.now()) // Record when stars started
        return
      }
      if (GONG_TIMES.includes(now)) {
        const key = `gong_${now}`
        if (!gongs.current[key]) {
          gongs.current[key] = Date.now()
          setGongPlaying(true)
          play(now === 240 ? 'middle' : 'minute').catch(console.error)
          // Reset gong playing state after 5 seconds to match sound duration
          setTimeout(() => setGongPlaying(false), 5000)
        }
      }
    }, 250)
    return () => clearInterval(int.current)
  }, [run, play])

  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden && end.current) {
        const remaining = Math.max(0, Math.ceil((end.current - Date.now()) / 1000))
        setTime(remaining)
        if (remaining === 0) {
          if (!done) {
            stop('end')
          } else {
            // Timer already finished, show stars immediately
            setShowStars(true)
          }
        }
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [run, done])

  const start = async () => {
    if (done || time === 0) return
    end.current = Date.now() + time * 1000
    setRun(true); setDone(false); gongs.current = {}
    setShowStars(false); setStarStartTime(null) // No stars during countdown
    // Play start sound immediately without await to prevent delay
    play('start')
  }
  
  const stop = async (final?: 'end') => { 
    setRun(false)
    if (final) { 
      await play(final)
      if (final === 'end') {
        setDone(true)
        setShowStars(true) // Show stars only when timer ends
        setStarStartTime(Date.now()) // Record when stars started
      }
    }
    if (final !== 'end') {
      setShowStars(false) // Hide stars if stopping early
    }
  }
  
  const reset = () => { 
    stop(); setTime(480); setDone(false); gongs.current = {}
    setShowStars(false); setStarStartTime(null)
  }
  
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <>
      <style>
        {`
          @keyframes timer-pulse-slow {
            0% { background-position: 0% 0%; }
            25% { background-position: 100% 0%; }
            50% { background-position: 100% 100%; }
            75% { background-position: 0% 100%; }
            100% { background-position: 0% 0%; }
          }
          @keyframes timer-pulse-fast {
            0% { background-position: 0% 0%; }
            25% { background-position: 100% 0%; }
            50% { background-position: 100% 100%; }
            75% { background-position: 0% 100%; }
            100% { background-position: 0% 0%; }
          }

          

        `}
      </style>
      <div 
        className={`min-h-screen text-white font-mono flex flex-col items-center justify-center overflow-hidden relative ${gongPlaying ? 'gong-playing' : ''}`}
        data-timer-page="true"
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 20%, #0a0f1c 40%, #0a0a0a 60%, #0a0f1c 80%, #000000 100%)',
          backgroundSize: '150% 150%',
          animation: gongPlaying ? 'timer-pulse-fast 8s ease-in-out infinite' : 'timer-pulse-slow 40s ease-in-out infinite'
        }}
      >
        {showStars && <ShootingStars active={true} startTime={starStartTime} />}
                {/* Time display - always visible */}
        <div className="text-8xl mb-6 text-gray-300 tracking-wider font-light">{fmt(time)}</div>
        

        
        {/* Controls container */}
        <div className="flex gap-6">
          {!run && time > 0 && !done && 
            <button onClick={start} title="Start" className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5c0-0.3 0.2-0.5 0.5-0.5l11 6.5c0.3 0.2 0.3 0.6 0 0.8l-11 6.5c-0.3 0.2-0.5 0-0.5-0.3V5.5z" />
              </svg>
            </button>
          }
          {run && 
            <button onClick={() => stop()} title="Pause" className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center gap-1">
              <div className="w-1.5 h-6 bg-gray-200 rounded-sm" /><div className="w-1.5 h-6 bg-gray-200 rounded-sm" />
            </button>
          }
          <button onClick={reset} title="Reset" className="w-16 h-16 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-4xl">↺</button>
          

          

        </div>
              {/* Version pill - commented out
      <div className="mt-6">
        <span className="inline-block bg-purple-600 text-white text-sm px-4 py-2 rounded-lg font-mono border-2 border-purple-400 shadow-lg">
          🚀 {version} • {date}
        </span>
      </div>
      */}
      

      </div>
    </>
  )
}