import { useState, useEffect, useRef } from 'react'
import { useAudio } from './useAudio'
import { usePWA } from './usePWA'
import { useVersion } from './useVersion'

const GONG_TIMES = [420, 360, 300, 240, 180, 120, 60] // seconds

export default function TimerPage() {
  const [time, setTime] = useState(480), [run, setRun] = useState(false), [done, setDone] = useState(false)
  const end = useRef(0), int = useRef<NodeJS.Timeout>(), gongs = useRef<Record<string, number>>({})
  const play = useAudio()
  const { version, date } = useVersion()
  
  usePWA()

  useEffect(() => {
    if (!run) return
    int.current = setInterval(() => {
      const now = Math.max(0, Math.ceil((end.current - Date.now()) / 1000))
      setTime(now)
      if (now === 0) return stop('end')
      if (GONG_TIMES.includes(now)) {
        const key = `gong_${now}`
        if (!gongs.current[key]) {
          gongs.current[key] = Date.now()
          play(now === 240 ? 'middle' : 'minute').catch(console.error)
        }
      }
    }, 250)
    return () => clearInterval(int.current)
  }, [run, play])

  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden && run && end.current) {
        const remaining = Math.max(0, Math.ceil((end.current - Date.now()) / 1000))
        setTime(remaining)
        if (remaining === 0 && !done) stop('end')
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [run, done])

  const start = async () => {
    if (done || time === 0) return
    end.current = Date.now() + time * 1000
    setRun(true); setDone(false); gongs.current = {}; await play('start')
  }
  
  const stop = async (final?: 'end') => { 
    setRun(false); if (final) { await play(final); setDone(true) }
  }
  
  const reset = () => { 
    stop(); setTime(480); setDone(false); gongs.current = {}
  }
  
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center">
      <div className="text-8xl mb-6 text-gray-300 tracking-wider font-light">{fmt(time)}</div>
      <div className="flex gap-6">
        {!run && time > 0 && !done && 
          <button onClick={start} title="Start" className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[16px] border-t-[10px] border-b-[10px] border-transparent border-l-gray-200 ml-1" />
          </button>
        }
        {run && 
          <button onClick={() => stop()} title="Pause" className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center gap-1">
            <div className="w-1.5 h-6 bg-gray-200" /><div className="w-1.5 h-6 bg-gray-200" />
          </button>
        }
        <button onClick={reset} title="Reset" className="w-16 h-16 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-3xl">↺</button>
      </div>
      <div className="mt-6">
        <span className="inline-block bg-purple-600 text-white text-sm px-4 py-2 rounded-lg font-mono border-2 border-purple-400 shadow-lg">
          🚀 {version} • {date}
        </span>
      </div>
    </div>
  )
}