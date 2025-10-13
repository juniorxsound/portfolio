import React from 'react'
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  className?: string
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  background?: 'default' | 'accent' | 'muted' | 'primary' | 'secondary'
  backgroundImage?: string
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
  description,
  className,
  height = 'xl',
  background = 'accent',
  backgroundImage,
  alignment = 'left',
  children,
}: HeroProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center relative',
        heightClasses[height],
        backgroundClasses[background],
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : undefined
      }
    >
      {/* overlay for better text readability */}
      {backgroundImage && (
        <div
          className={cn(
            'absolute inset-0',
            `${backgroundClasses[background]} opacity-70`
          )}
        />
      )}

      <div
        className={cn(
          'container mx-auto max-w-6xl relative z-10',
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
