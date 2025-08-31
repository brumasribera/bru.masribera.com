import { useRef, useCallback, useEffect } from 'react'
import { GONG_SOUNDS, TIMER_CONSTANTS, type GongType, type AudioSystemRefs } from './types'

/**
 * Optimized Web Audio API hook for timer gongs
 * Designed to minimize interruption to background audio apps like Petit Bambou
 */
export function useAudioSystem() {
  const audioRefs = useRef<AudioSystemRefs>({
    audioContext: null,
    gainNode: null,
    gongBuffers: {}
  })

  // Initialize Web Audio API system
  const initAudioSystem = useCallback(async (): Promise<boolean> => {
    try {
      // Create audio context with optimized settings
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      audioRefs.current.audioContext = new AudioContext()
      
      // Create gain node with reduced volume to minimize Android audio ducking
      audioRefs.current.gainNode = audioRefs.current.audioContext.createGain()
      audioRefs.current.gainNode.gain.value = TIMER_CONSTANTS.AUDIO_VOLUME
      audioRefs.current.gainNode.connect(audioRefs.current.audioContext.destination)
      
      console.log('🔊 Audio system initialized')
      return true
    } catch (error) {
      console.error('Failed to initialize audio system:', error)
      return false
    }
  }, [])

  // Decode audio file using Web Audio API
  const decodeAudioFile = useCallback(async (src: string): Promise<AudioBuffer | null> => {
    if (!audioRefs.current.audioContext) {
      const initialized = await initAudioSystem()
      if (!initialized) return null
    }
    
    try {
      const response = await fetch(src)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await audioRefs.current.audioContext!.decodeAudioData(arrayBuffer)
      
      return audioBuffer
    } catch (error) {
      console.error(`Failed to decode audio: ${src}`, error)
      return null
    }
  }, [initAudioSystem])

  // Load all gong sounds into memory
  const loadGongSounds = useCallback(async (): Promise<void> => {
    const loadPromises = Object.entries(GONG_SOUNDS).map(async ([key, src]) => {
      try {
        const audioBuffer = await decodeAudioFile(src)
        if (audioBuffer) {
          audioRefs.current.gongBuffers[key] = audioBuffer
          console.log(`✅ Loaded ${key} gong`)
        }
      } catch (error) {
        console.warn(`Failed to load ${key} gong:`, error)
      }
    })
    
    await Promise.all(loadPromises)
    console.log('🎵 All gong sounds loaded')
  }, [decodeAudioFile])

  // Play gong with optimized Web Audio API
  const playGong = useCallback((type: GongType): void => {
    const { audioContext, gainNode, gongBuffers } = audioRefs.current
    
    if (!audioContext || !gainNode) {
      console.warn('Audio system not initialized')
      return
    }
    
    const audioBuffer = gongBuffers[type]
    if (!audioBuffer) {
      console.warn(`Audio buffer not loaded for ${type}`)
      return
    }
    
    try {
      // Resume audio context if suspended (autoplay policy compliance)
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
      
      // Create and configure buffer source
      const source = audioContext.createBufferSource()
      source.buffer = audioBuffer
      source.connect(gainNode)
      
      // Play immediately
      source.start(0)
      
      console.log(`🔔 ${type} gong played at ${new Date().toISOString()}`)
    } catch (error) {
      console.error(`Failed to play ${type} gong:`, error)
    }
  }, [])

  // Resume audio context when app regains focus
  const resumeAudio = useCallback((): void => {
    const { audioContext } = audioRefs.current
    
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume()
      console.log('🔊 Audio context resumed')
    }
  }, [])

  // Cleanup audio resources
  const cleanup = useCallback((): void => {
    const { audioContext } = audioRefs.current
    
    if (audioContext) {
      audioContext.close()
      console.log('🔇 Audio system cleaned up')
    }
    
    audioRefs.current = {
      audioContext: null,
      gainNode: null,
      gongBuffers: {}
    }
  }, [])

  // Initialize audio system on mount
  useEffect(() => {
    let mounted = true
    
    const initialize = async () => {
      const initialized = await initAudioSystem()
      if (initialized && mounted) {
        await loadGongSounds()
      }
    }
    
    initialize()
    
    return () => {
      mounted = false
      cleanup()
    }
  }, [initAudioSystem, loadGongSounds, cleanup])

  return {
    playGong,
    resumeAudio,
    cleanup,
    isReady: () => Object.keys(audioRefs.current.gongBuffers).length > 0
  }
}
