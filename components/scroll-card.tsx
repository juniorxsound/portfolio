import React from 'react'
import { cn } from '@/lib/utils'

interface ScrollCardProps {
  children: React.ReactNode
  className?: string
}

export function ScrollCard({ children, className }: ScrollCardProps) {
  return (
    <div
      className={cn(
        'relative z-10 bg-background',
        'shadow-[0_-12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_-12px_40px_rgba(0,0,0,0.4)]',
        className
      )}
    >
      {/* h-0 sticky anchor takes no flow space; absolute child renders the
          visual gradient behind the navbar without pushing content down */}
      <div className="sticky top-0 z-40 h-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />
      </div>
      {children}
    </div>
  )
}
