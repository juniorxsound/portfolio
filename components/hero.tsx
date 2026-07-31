import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'

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
  titleClassName?: string
  overlayClassName?: string
  children?: React.ReactNode
}

const heightClasses = {
  sm: 'h-[40vh]',
  md: 'h-[50vh]',
  lg: 'h-[60vh]',
  xl: 'h-[90vh]',
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
  titleClassName =
    'hero-title-reveal !text-5xl md:!text-6xl lg:!text-7xl !font-bold',
  overlayClassName = 'opacity-0',
  children,
}: HeroProps) {
  const DEFAULT_BLUR =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center relative overflow-hidden',
        heightClasses[height],
        backgroundClasses[background],
        className
      )}
    >
      {/* Optimized background image (when no background video is provided) */}
      {backgroundImage &&
      !(videoSrc || (videoSources && videoSources.length > 0)) ? (
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          placeholder="blur"
          className="absolute inset-0 object-cover z-0"
        />
      ) : null}

      {(videoSrc || (videoSources && videoSources.length > 0)) && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 motion-reduce:hidden"
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
          {/* Fallback single source for backwards compatibility */}
          {videoSrc ? <source src={videoSrc} /> : null}
        </video>
      )}
      {/* overlay for better text readability */}
      {(backgroundImage ||
        videoSrc ||
        (videoSources && videoSources.length > 0)) && (
        <div
          className={cn(
            'absolute inset-0',
            backgroundClasses[background],
            overlayClassName
          )}
        />
      )}

      <div
        className={cn(
          'container mx-auto max-w-[1448px] relative',
          alignmentClasses[alignment]
        )}
      >
        {subtitle && <p className="text-muted-foreground mb-2">{subtitle}</p>}
        <h1
          className={cn(
            'mb-4 max-w-6xl font-light leading-tight',
            titleClassName
          )}
        >
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        )}
        {children}
      </div>
    </div>
  )
}
