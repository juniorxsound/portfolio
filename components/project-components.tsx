import React from 'react'
import { cn } from '@/lib/utils'
import {
  Code2,
  Monitor,
  Brain,
  Box,
  Database,
  Palette,
  Camera,
  Globe,
  Zap,
  Settings,
  FileText,
  Layers,
} from 'lucide-react'

interface ProjectComponentsProps {
  components: [string, string][]
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

// Icon mapping for different component categories
const getCategoryIcon = (category: string) => {
  const normalizedCategory = category.toLowerCase()

  switch (normalizedCategory) {
    case 'code':
    case 'programming':
    case 'development':
      return Code2
    case 'software':
    case 'framework':
    case 'library':
    case 'tool':
      return Monitor
    case 'ml':
    case 'ai':
    case 'machine learning':
    case 'artificial intelligence':
      return Brain
    case '3d':
    case 'modeling':
    case 'animation':
      return Box
    case 'database':
    case 'data':
      return Database
    case 'design':
    case 'ui':
    case 'ux':
    case 'visual':
      return Palette
    case 'camera':
    case 'video':
    case 'photography':
      return Camera
    case 'web':
    case 'frontend':
    case 'backend':
      return Globe
    case 'performance':
    case 'optimization':
      return Zap
    case 'config':
    case 'setup':
    case 'deployment':
      return Settings
    case 'documentation':
    case 'content':
      return FileText
    case 'layer':
    case 'stack':
    case 'architecture':
      return Layers
    default:
      return Settings
  }
}

export function ProjectComponents({
  components,
  size = 'sm',
  className,
}: ProjectComponentsProps) {
  if (!components || components.length === 0) {
    return null
  }

  const pillSizes = {
    xs: 'px-2 py-1 text-xs gap-1',
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2',
  }

  const iconSizes = {
    xs: 'h-3 w-3',
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-4 w-4',
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {components.map(([category, technologies], index) => {
        const IconComponent = getCategoryIcon(category)
        return (
          <div
            key={index}
            className={cn(
              'inline-flex items-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors',
              pillSizes[size]
            )}
          >
            <IconComponent className={cn('text-primary', iconSizes[size])} />
            <span className="text-muted-foreground/70">{technologies}</span>
          </div>
        )
      })}
    </div>
  )
}
