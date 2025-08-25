import { useState, useEffect } from 'react'

export const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    // Check initial status
    setIsOffline(!navigator.onLine)

    // Listen for online/offline events
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black px-4 py-2 text-center z-50 shadow-md">
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg">📱</span>
        <span className="font-medium">You're offline - but the site still works!</span>
        <span className="text-sm opacity-75">(Timer and cached content available)</span>
      </div>
    </div>
  )
}
