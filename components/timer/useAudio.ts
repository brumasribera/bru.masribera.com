import { useRef, useEffect, useCallback } from 'react'

const GONGS = {
  start: '/timer-sounds/start-gong.mp3',
  middle: '/timer-sounds/middle-gong.mp3',
  minute: '/timer-sounds/1m-gong.mp3',
  end: '/timer-sounds/end-gong.mp3',
} as const

export function useAudio() {
  const ctx = useRef<AudioContext>()
  const gain = useRef<GainNode>()
  const bufs = useRef<Record<string, AudioBuffer>>({})
  const isInitialized = useRef(false)

  const initAudio = async () => {
    if (isInitialized.current) return
    
    try {
      ctx.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      gain.current = ctx.current.createGain()
      gain.current.gain.value = 0.3
      gain.current.connect(ctx.current.destination)
      
      console.log('🎵 Loading audio files...')
      for (const [k, v] of Object.entries(GONGS)) {
        try {
          console.log(`🎵 Loading ${k}: ${v}`)
          const response = await fetch(v)
          if (!response.ok) {
            console.warn(`❌ Failed to fetch ${k}: ${response.status}`)
            continue
          }
          const b = await response.arrayBuffer()
          bufs.current[k] = await ctx.current!.decodeAudioData(b)
          console.log(`✅ Loaded ${k} audio`)
        } catch (error) {
          console.error(`❌ Error loading ${k}:`, error)
        }
      }
      console.log('🎵 Audio system ready:', Object.keys(bufs.current))
      isInitialized.current = true
    } catch (error) {
      console.error('❌ Failed to initialize audio system:', error)
    }
  }

  const play = useCallback(async (t: keyof typeof GONGS) => {
    console.log(`🔔 Attempting to play ${t} gong`)
    
    // Initialize audio system on first play (after user interaction)
    if (!isInitialized.current) {
      await initAudio()
    }
    
    if (!ctx.current || !gain.current) {
      console.warn('❌ Audio system not initialized')
      return
    }
    if (!bufs.current[t]) {
      console.warn(`❌ Audio buffer not loaded for ${t}`)
      return
    }
    if (ctx.current.state === 'suspended') {
      console.log('🎵 Resuming suspended audio context')
      await ctx.current.resume()
    }
    try {
      const s = ctx.current.createBufferSource()
      s.buffer = bufs.current[t]
      s.connect(gain.current)
      
      // Ensure the sound plays for its full duration
      s.onended = () => {
        console.log(`✅ ${t} gong finished playing`)
      }
      
      // Start playing immediately
      s.start(0)
      console.log(`✅ Playing ${t} gong (duration: ${bufs.current[t].duration.toFixed(2)}s)`)
      
      // Log the actual duration to verify it's playing fully
      console.log(`📊 ${t} gong buffer duration: ${bufs.current[t].duration.toFixed(2)}s`)
      
    } catch (error) {
      console.error(`❌ Error playing ${t} gong:`, error)
    }
  }, [])

  // Cleanup function
  useEffect(() => {
    return () => {
      if (ctx.current) {
        ctx.current.close()
      }
    }
  }, [])

  return play
}
