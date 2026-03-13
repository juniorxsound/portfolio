import React from 'react'
import { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'
import { HeroParallaxMedia } from './hero-parallax-media'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  className?: string
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  background?: 'default' | 'accent' | 'muted' | 'primary' | 'secondary'
  backgroundImage?: StaticImageData
  videoSrc?: string
  videoSources?: { src: string; type: string }[]
  videoPoster?: string
  alignment?: 'left' | 'center' | 'right'
  fadeToBackground?: boolean
  mediaParallax?: boolean
  videoParallax?: boolean
  parallaxSpeed?: number
  parallaxMaxOffset?: number
  children?: React.ReactNode
}

const heightClasses = {
  sm: 'h-[40vh]',
  md: 'h-[50vh]',
  lg: 'h-[60vh]',
  xl: 'h-[70vh]',
  full: 'h-screen',
}

const backgroundClasses = {
  default: 'bg-background',
  accent: 'bg-accent',
  muted: 'bg-muted',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
}

const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export function Hero({
  title,
  subtitle,
  description,
  className,
  height = 'xl',
  background = 'accent',
  backgroundImage,
  videoSrc,
  videoSources,
  videoPoster,
  alignment = 'left',
  fadeToBackground = false,
  mediaParallax = true,
  videoParallax = true,
  parallaxSpeed = 0.5,
  parallaxMaxOffset = 60,
  children,
}: HeroProps) {
  const hasVideo = Boolean(
    videoSrc || (videoSources && videoSources.length > 0)
  )
  const hasImage = Boolean(backgroundImage) && !hasVideo
  const hasMedia = hasVideo || hasImage
  const shouldParallax = mediaParallax ?? videoParallax

  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center relative overflow-hidden',
        heightClasses[height],
        backgroundClasses[background],
        className
      )}
    >
      {hasMedia && (
        <HeroParallaxMedia
          className="z-0"
          imageSrc={hasImage ? backgroundImage : undefined}
          videoPoster={videoPoster}
          videoSources={videoSources}
          videoSrc={videoSrc}
          enabled={shouldParallax}
          speed={parallaxSpeed}
          maxOffset={parallaxMaxOffset}
        />
      )}
      {/* overlay for better text readability */}
      {hasMedia && (
        <div
          className={cn(
            'absolute inset-0 z-10',
            `${backgroundClasses[background]} opacity-70`
          )}
        />
      )}

      {fadeToBackground && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-28 bg-gradient-to-b from-transparent via-background/70 to-background md:h-40"
        />
      )}

      <div
        className={cn(
          'container mx-auto max-w-6xl relative z-20',
          alignmentClasses[alignment]
        )}
      >
        {subtitle && <p className="text-muted-foreground mb-2">{subtitle}</p>}
        <h1 className="font-light leading-tight mb-4">{title}</h1>
        {description && (
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        )}
        {children}
      </div>
    </div>
  )
}
