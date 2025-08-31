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

    // Add PWA meta tags
    const addMeta = (name: string, content: string) => {
      const existing = document.querySelector(`meta[name="${name}"]`)
      if (existing) existing.remove()
      const meta = document.createElement('meta')
      meta.name = name
      meta.content = content
      document.head.appendChild(meta)
      return meta
    }

    const themeColorMeta = addMeta('theme-color', '#000000')
    const appleCapableMeta = addMeta('apple-mobile-web-app-capable', 'yes')
    const mobileCapableMeta = addMeta('mobile-web-app-capable', 'yes')
    
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('✔ Service Worker registered', reg))
        .catch(err => console.error('❌ Service Worker error', err))
    }
    
    return () => {
      // Restore original
      document.title = 'Bru Mas Ribera - Frontend & UX Engineer'
      if (link && orig) link.href = orig
      manifest.remove()
      themeColorMeta.remove()
      appleCapableMeta.remove()
      mobileCapableMeta.remove()
      const originalManifest = document.createElement('link')
      originalManifest.rel = 'manifest'
      originalManifest.href = '/site.webmanifest'
      document.head.appendChild(originalManifest)
    }
  }, [])
}
