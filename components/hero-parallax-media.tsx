'use client'

import React, { useEffect, useRef } from 'react'
import Image, { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'

interface HeroParallaxMediaProps {
  className?: string
  imageSrc?: StaticImageData
  imageAlt?: string
  videoSrc?: string
  videoSources?: { src: string; type: string }[]
  videoPoster?: string
  enabled?: boolean
  speed?: number
  maxOffset?: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function HeroParallaxMedia({
  className,
  imageSrc,
  imageAlt = '',
  videoSrc,
  videoSources,
  videoPoster,
  enabled = true,
  speed = 0.16,
  maxOffset = 40,
}: HeroParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const reduceMotionRef = useRef(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotionRef.current = mediaQuery.matches

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduceMotionRef.current = event.matches
    }

    mediaQuery.addEventListener('change', handleMotionChange)

    const updateTransform = () => {
      frameRef.current = null
      const container = containerRef.current
      const media = mediaRef.current

      if (!container || !media) {
        return
      }

      if (reduceMotionRef.current || !enabled || speed === 0 || maxOffset === 0) {
        media.style.transform = 'translate3d(0, 0, 0) scale(1.08)'
        return
      }

      // Element-relative offset keeps motion subtle and bounded.
      const rect = container.getBoundingClientRect()
      const rawOffset = -rect.top * speed
      const offset = clamp(rawOffset, -maxOffset, maxOffset)
      media.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`
    }

    const scheduleUpdate = () => {
      if (frameRef.current !== null) {
        return
      }
      frameRef.current = window.requestAnimationFrame(updateTransform)
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    scheduleUpdate()

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      mediaQuery.removeEventListener('change', handleMotionChange)
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [enabled, maxOffset, speed])

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden', className)}
    >
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
            placeholder="blur"
            className="object-cover"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={videoPoster}
            aria-hidden="true"
          >
            {videoSources?.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
            {videoSrc ? <source src={videoSrc} /> : null}
          </video>
        )}
      </div>
    </div>
  )
}
