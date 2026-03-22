'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Project } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const fm = project.frontmatter
  const tags = Array.isArray(fm.tags) ? fm.tags.join(' / ') : ''

  const [isActive, setIsActive] = useState(false)
  const gifRef = useRef<HTMLImageElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!fm.animatedThumbnail) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const isMobile = window.matchMedia('(max-width: 767px)').matches

    if (!isMobile) return

    const card = cardRef.current
    if (!card) return

    // Narrow center-band: only the card occupying the middle 30% of the
    // viewport triggers — ensures one card active at a time on mobile.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Set src on first entry — browser never fetched it until now
          if (gifRef.current && !gifRef.current.getAttribute('src')) {
            gifRef.current.src = fm.animatedThumbnail!
          }
          setIsActive(true)
        } else {
          setIsActive(false)
        }
      },
      { rootMargin: '-62% 0px -33% 0px', threshold: 0 }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [fm.animatedThumbnail])

  const handleMouseEnter = () => {
    if (!fm.animatedThumbnail) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Set src once — browser caches it for all subsequent hovers
    if (gifRef.current && !gifRef.current.getAttribute('src')) {
      gifRef.current.src = fm.animatedThumbnail
    }
    setIsActive(true)
  }

  const handleMouseLeave = () => setIsActive(false)

  return (
    <div className={className} ref={cardRef}>
      <Card
        className="h-full hover:shadow-lg transition-shadow duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          href={`/projects/${fm.path ? fm.path.replace(/^\//, '') : ''}`}
          className="block"
        >
          <div className="overflow-hidden rounded-t-lg relative">
            {fm.thumbnail && (
              <Image
                src={fm.thumbnail}
                  alt={fm.title || 'Project thumbnail'}
                placeholder="blur"
                className={cn(
                  'w-full h-48 object-cover motion-safe:transition-opacity motion-safe:duration-300',
                  isActive ? 'opacity-0' : 'opacity-100'
                )}
              />
            )}
            {fm.animatedThumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={gifRef}
                alt=""
                aria-hidden="true"
                className={cn(
                  'absolute inset-0 w-full h-48 object-cover motion-safe:transition-opacity motion-safe:duration-300',
                  isActive ? 'opacity-100' : 'opacity-0'
                )}
              />
            )}
            {fm.badge && (
              <div className="absolute top-4 left-4 bg-accent/95 rounded-md px-2 py-1 flex items-center justify-center gap-1">
                <Image
                  src={fm.badge}
                  alt="Project badge"
                  width={80}
                  height={20}
                  loading="lazy"
                  unoptimized
                  className="max-h-5 max-w-20 w-auto h-auto invert dark:invert-0"
                />
              </div>
            )}
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold hover:text-primary transition-colors">
              {fm.title || 'Untitled Project'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm text-muted-foreground mb-2">{tags}</div>
            <div className="text-sm text-foreground">{fm.excerpt || ''}</div>
          </CardContent>
        </Link>
      </Card>
    </div>
  )
}
