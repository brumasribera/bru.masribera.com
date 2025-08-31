import { useEffect } from 'react'

export function usePWA() {
  useEffect(() => {
    // Set timer title and favicon
    document.title = 'Stretch Timer'
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement
    const orig = link?.href
    if (link) link.href = '/favicons/favicon-timer.svg'
    
    // Set timer manifest
    const existingManifest = document.querySelector("link[rel='manifest']")
    existingManifest?.remove()
    const manifest = document.createElement('link')
    manifest.rel = 'manifest'
    manifest.href = `/tools/timer/manifest.webmanifest?v=${Date.now()}`
    document.head.appendChild(manifest)
    
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
    
    return () => {
      // Restore original
      document.title = 'Bru Mas Ribera - Frontend & UX Engineer'
      if (link && orig) link.href = orig
      manifest.remove()
      const originalManifest = document.createElement('link')
      originalManifest.rel = 'manifest'
      originalManifest.href = '/site.webmanifest'
      document.head.appendChild(originalManifest)
    }
  }, [])
}
