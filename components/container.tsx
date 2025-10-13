import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  maxWidth?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | 'full'
}

const sizeClasses = {
  sm: 'px-4 py-6',
  md: 'px-6 py-8',
  lg: 'px-8 py-10',
  xl: 'px-8 py-12',
  full: 'px-4 py-4',
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
}

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12',
}

export function Container({
  children,
  className,
  size = 'xl',
  padding,
  maxWidth = '6xl',
}: ContainerProps) {
  return (
    <div
      className={cn(
        'container mx-auto',
        padding ? paddingClasses[padding] : sizeClasses[size],
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  )
}
