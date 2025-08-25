import React from 'react'
import { usePWAManifest } from '../hooks/usePWAManifest'

interface PWASupportProps {
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

export function withPWASupport<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  defaultConfig: PWASupportProps = {}
) {
  return function PWASupportedComponent(props: P) {
    // Get the current route for automatic configuration
    const currentPath = window.location.pathname
    
    // Merge default config with route-specific defaults
    const config: PWASupportProps = {
      start_url: currentPath,
      scope: currentPath,
      display: 'standalone',
      theme_color: '#3b82f6',
      background_color: '#ffffff',
      orientation: 'portrait-primary',
      categories: ['productivity', 'utilities'],
      ...defaultConfig
    }

    // Use the PWA manifest hook
    usePWAManifest(config)

    return <WrappedComponent {...props} />
  }
}
