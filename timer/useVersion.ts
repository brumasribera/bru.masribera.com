import { useState, useEffect } from 'react'

export function useVersion() {
  const [version, setVersion] = useState('v1.1.9')
  const [date, setDate] = useState('28 Thursday August 16:59')

  useEffect(() => {
    fetch(`/VERSION.json?v=${Date.now()}`)
      .then(r => r.json())
      .then(data => {
        const d = new Date(data.timestamp + ' UTC')
        setVersion(`v${data.version}`)
        setDate(`${d.getDate()} ${d.toLocaleDateString('en-US', { weekday: 'long' })} ${d.toLocaleDateString('en-US', { month: 'long' })} ${d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}`)
      })
      .catch(() => {}) // Keep fallback values
  }, [])

  return { version, date }
}
