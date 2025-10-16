'use client'

import { useState, useRef, useEffect } from 'react'

export function useScrollFades() {
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer

      // Show left fade if scrolled from the beginning
      setShowLeftFade(scrollLeft > 0)

      // Show right fade if not scrolled to the end
      setShowRightFade(scrollLeft < scrollWidth - clientWidth - 1)
    }

    // Initial check
    handleScroll()

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [])

  return {
    showLeftFade,
    showRightFade,
    scrollContainerRef,
  }
}
