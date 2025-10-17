import React from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Writing } from '@/types'
import Image from 'next/image'

interface WritingCardProps {
  writing: Writing
  className?: string
}

export function WritingCard({ writing, className }: WritingCardProps) {
  const fm = writing.frontmatter
  const tags = Array.isArray(fm.tags) ? fm.tags.join(' / ') : ''
  const isExternal = Boolean(fm.href)

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isExternal) {
      return (
        <a
          href={fm.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {children}
        </a>
      )
    }
    return <div className="block">{children}</div>
  }

  return (
    <div className={className}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
        <CardWrapper>
          <div className="overflow-hidden rounded-t-lg relative">
            {fm.thumbnail && (
              <Image placeholder="blur" src={fm.thumbnail} alt="" />
            )}
            {fm.badge && (
              <div className="absolute top-4 left-4 bg-accent/95 rounded-md px-2 py-1 flex items-center justify-center gap-1">
                <img
                  src={fm.badge}
                  alt="Publication badge"
                  className="max-h-5 max-w-20 w-auto h-auto invert dark:invert-0"
                />
              </div>
            )}
            {isExternal && (
              <div className="absolute top-4 right-4 bg-accent/95 rounded-md px-2 py-1 flex items-center justify-center gap-1">
                <ExternalLink className="h-4 w-4" />
              </div>
            )}
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
              {fm.title || 'Untitled Article'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm text-muted-foreground mb-2">{tags}</div>
            {fm.date && (
              <div className="text-xs text-muted-foreground mt-2">
                {new Date(fm.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            )}
          </CardContent>
        </CardWrapper>
      </Card>
    </div>
  )
}
