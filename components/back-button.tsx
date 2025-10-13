import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BackButtonProps {
  href?: string
  children?: React.ReactNode
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  position?: 'absolute' | 'relative' | 'static'
}

export function BackButton({
  href = '/',
  children = 'Back to Home',
  variant = 'ghost',
  size = 'sm',
  className,
  position = 'absolute',
}: BackButtonProps) {
  const positionClasses = {
    absolute: 'absolute top-4 left-4 z-20',
    relative: 'relative',
    static: 'static',
  }

  return (
    <div className={cn(positionClasses[position], className)}>
      <Link href={href}>
        <Button variant={variant} size={size} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {children}
        </Button>
      </Link>
    </div>
  )
}
