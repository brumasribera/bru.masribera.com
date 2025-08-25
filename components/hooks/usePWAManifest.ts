import { useEffect } from 'react'

interface PWAManifestConfig {
  name?: string
  short_name?: string
  description?: string
  start_url?: string
  scope?: string
  theme_color?: string
  background_color?: string
  display?: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'
  orientation?: 'portrait' | 'landscape' | 'portrait-primary' | 'landscape-primary'
  categories?: string[]
}

export function usePWAManifest(config: PWAManifestConfig = {}) {
  useEffect(() => {
    const currentPath = window.location.pathname
    
    // Create route-specific manifest
    const createRouteManifest = () => {
      const routeManifest = {
        name: config.name || `${document.title || 'App'} - Bru Mas Ribera`,
        short_name: config.short_name || document.title || 'App',
        description: config.description || `A page from Bru Mas Ribera's portfolio`,
        start_url: config.start_url || currentPath,
        display: config.display || 'standalone',
        background_color: config.background_color || '#ffffff',
        theme_color: config.theme_color || '#3b82f6',
        orientation: config.orientation || 'portrait-primary',
        scope: config.scope || currentPath,
        lang: 'en',
        categories: config.categories || ['productivity', 'utilities'],
        prefer_related_applications: false,
        related_applications: [],
        icons: [
          {
            src: '/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png'
          },
          {
            src: '/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: '/favicon-32x32.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }

      return routeManifest
    }

    // Set the route-specific manifest
    const setRouteManifest = () => {
      const existingManifest = document.querySelector("link[rel='manifest']") as HTMLLinkElement
      
      if (existingManifest) {
        // Store the original manifest href to restore later
        if (!existingManifest.dataset.originalHref) {
          existingManifest.dataset.originalHref = existingManifest.href
        }
        
        // Create a data URL with the manifest content
        const manifestContent = JSON.stringify(createRouteManifest(), null, 2)
        const dataUrl = `data:application/json;charset=utf-8,${encodeURIComponent(manifestContent)}`
        
        existingManifest.href = dataUrl
      }
    }

    // Add PWA meta tags
    const addPWAMetaTags = () => {
      const metaTags = [
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: document.title || 'App' },
        { name: 'application-name', content: document.title || 'App' },
        { name: 'msapplication-TileColor', content: config.theme_color || '#3b82f6' },
        { name: 'msapplication-config', content: '/browserconfig.xml' }
      ]
      
      metaTags.forEach(tag => {
        const existingMeta = document.querySelector(`meta[name="${tag.name}"]`)
        if (!existingMeta) {
          const meta = document.createElement('meta')
          meta.name = tag.name
          meta.content = tag.content
          document.head.appendChild(meta)
        }
      })
    }

    // Initialize PWA features
    setRouteManifest()
    addPWAMetaTags()

    // Cleanup function
    return () => {
      // Restore original manifest
      const currentManifest = document.querySelector("link[rel='manifest']") as HTMLLinkElement
      if (currentManifest && currentManifest.dataset.originalHref) {
        currentManifest.href = currentManifest.dataset.originalHref
        delete currentManifest.dataset.originalHref
      }
      
      // Remove PWA meta tags
      const pwaMetaTags = [
        'mobile-web-app-capable',
        'apple-mobile-web-app-capable',
        'apple-mobile-web-app-status-bar-style',
        'apple-mobile-web-app-title',
        'application-name',
        'msapplication-TileColor',
        'msapplication-config'
      ]
      
      pwaMetaTags.forEach(name => {
        const meta = document.querySelector(`meta[name="${name}"]`)
        if (meta) {
          meta.remove()
        }
      })
    }
  }, [config])
}
