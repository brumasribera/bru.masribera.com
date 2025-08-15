import { useState } from 'react'

export function useFirstHoverTooltip() {
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const shouldShowTooltip = isHovering

  return {
    shouldShowTooltip,
    handleMouseEnter,
    handleMouseLeave
  }
}
