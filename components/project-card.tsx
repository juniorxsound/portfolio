'use client'

import React from 'react'
import Link from 'next/link'
import { Project } from '@/types'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const [hasHovered, setHasHovered] = React.useState(false)
  const fm = project.frontmatter
  const tags = Array.isArray(fm.tags) ? fm.tags.join(' / ') : ''

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setHasHovered(true)
    }
  }

  return (
    <div className={className}>
      <Card className="h-full border-0 bg-transparent p-0 shadow-none group">
        <Link
          href={`/projects/${fm.path ? fm.path.replace(/^\//, '') : ''}`}
          className="block"
          onMouseEnter={handleMouseEnter}
        >
          <div className="portfolio-mosaic-media relative overflow-hidden rounded-2xl bg-muted">
            {fm.thumbnail && (
              <Image
                src={fm.thumbnail}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            {hasHovered && fm.animatedThumbnail && (
              <Image
                src={fm.animatedThumbnail}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
                className="object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:hidden"
              />
            )}
            {fm.badge && (
              <div className="absolute left-4 top-4 flex items-center justify-center gap-1 rounded-full bg-background/90 px-2.5 py-1 backdrop-blur-sm">
                <Image
                  src={fm.badge}
                  alt="Project badge"
                  width={80}
                  height={20}
                  loading="lazy"
                  unoptimized
                  style={{ width: 'auto', height: 'auto' }}
                  className="max-h-5 max-w-20 w-auto h-auto invert dark:invert-0"
                />
              </div>
            )}
            <div className="portfolio-mosaic-copy">
              <h3 className="text-lg font-normal tracking-tight">
                {fm.title || 'Untitled Project'}
              </h3>
              <div className="portfolio-mosaic-meta mt-1 text-sm">{tags}</div>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  )
}
