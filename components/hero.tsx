import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string
  subtitle?: string
  organizationLogo?: { src: string; alt: string }
  description?: string
  className?: string
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  background?: 'default' | 'accent' | 'muted' | 'primary' | 'secondary'
  backgroundImage?: StaticImageData
  videoSrc?: string
  videoSources?: { src: string; type: string }[]
  videoPoster?: string
  alignment?: 'left' | 'center' | 'right'
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
  organizationLogo,
  description,
  className,
  height = 'xl',
  background = 'accent',
  backgroundImage,
  videoSrc,
  videoSources,
  videoPoster,
  alignment = 'left',
  children,
}: HeroProps) {
  const DEFAULT_BLUR =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
  const hasBackgroundVideo =
    Boolean(videoSrc) || Boolean(videoSources && videoSources.length > 0)

  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center relative overflow-hidden',
        heightClasses[height],
        backgroundClasses[background],
        className
      )}
    >
      {/* With video, keep the cover exclusively as the reduced-motion fallback. */}
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          placeholder="blur"
          className={cn(
            'absolute inset-0 object-cover z-0',
            hasBackgroundVideo && 'hidden motion-reduce:block'
          )}
        />
      ) : null}

      {hasBackgroundVideo && (
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
      {(backgroundImage || hasBackgroundVideo) && (
        <div
          className={cn(
            'absolute inset-0',
            `${backgroundClasses[background]} opacity-50`
          )}
        />
      )}

      <div
        className={cn(
          'container relative z-10 mx-auto max-w-6xl px-8',
          alignmentClasses[alignment]
        )}
      >
        {organizationLogo && (
          <div className="relative mb-3 h-6 w-32">
            <Image
              src={organizationLogo.src}
              alt={organizationLogo.alt}
              fill
              sizes="128px"
              unoptimized
              className="object-contain object-left invert dark:invert-0"
            />
          </div>
        )}
        <h1 className="hero-title mb-4 max-w-4xl text-2xl leading-tight md:text-3xl lg:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="text-muted-foreground mb-2">{subtitle}</p>}
        {description && (
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        )}
        {children}
      </div>
    </div>
  )
}
