import React from 'react'
import { ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Writing } from '@/types'
import Image from 'next/image'

interface WritingCardProps {
  writing: Writing
  className?: string
}

export function WritingCard({ writing, className }: WritingCardProps) {
  const fm = writing.frontmatter
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
      <Card className="h-full border-0 bg-transparent p-0 shadow-none group">
        <CardWrapper>
          <div className="portfolio-mosaic-media relative overflow-hidden rounded-2xl bg-muted">
            {fm.thumbnail && (
              <Image
                placeholder="blur"
                src={fm.thumbnail}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            {fm.badge && (
              <div className="absolute left-4 top-4 flex items-center justify-center gap-1 rounded-full bg-background/90 px-2.5 py-1 backdrop-blur-sm">
                <Image
                  src={fm.badge}
                  alt="Publication badge"
                  width={80}
                  height={20}
                  loading="lazy"
                  unoptimized
                  style={{ width: 'auto', height: 'auto' }}
                  className="max-h-5 max-w-20 w-auto h-auto invert dark:invert-0"
                />
              </div>
            )}
            {isExternal && (
              <div className="absolute right-4 top-4 flex items-center justify-center gap-1 rounded-full bg-background/90 px-2.5 py-1 backdrop-blur-sm">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </div>
            )}
            <div className="portfolio-mosaic-copy">
              <h3 className="text-lg font-normal tracking-tight">
                {fm.title || 'Untitled Article'}
              </h3>
              {fm.date && (
                <div className="portfolio-mosaic-meta mt-2 text-xs">
                  {new Date(fm.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              )}
            </div>
          </div>
        </CardWrapper>
      </Card>
    </div>
  )
}
