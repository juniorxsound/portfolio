import React from 'react'
import Link from 'next/link'
import { Project } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

interface ProjectCardProps {
  project: Project
  className?: string
  compact?: boolean
}

export function ProjectCard({
  project,
  className,
  compact = false,
}: ProjectCardProps) {
  const fm = project.frontmatter
  const tags = Array.isArray(fm.tags) ? fm.tags.join(' / ') : ''

  return (
    <div className={className}>
      <Card className="h-full group transition-[border-color,box-shadow] duration-200 hover:border-foreground/20 hover:shadow-sm">
        <Link
          href={`/projects/${fm.path ? fm.path.replace(/^\//, '') : ''}`}
          className="block"
        >
          <div className="overflow-hidden rounded-t-lg relative">
            {fm.thumbnail && (
              <Image
                src={fm.thumbnail}
                alt={fm.path || 'project'}
                placeholder="blur"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            {fm.animatedThumbnail && (
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
              <div className="absolute top-4 left-4 flex items-center justify-center gap-1 rounded-md border border-border bg-muted px-2 py-1">
                <img
                  src={fm.badge}
                  alt="Project badge"
                  width={80}
                  height={20}
                  className="h-auto max-h-5 w-auto max-w-20 invert dark:invert-0"
                />
              </div>
            )}
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
              {fm.title || 'Untitled Project'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm text-muted-foreground mb-2">{tags}</div>
            {!compact && (
              <div className="text-sm text-foreground">{fm.excerpt || ''}</div>
            )}
          </CardContent>
        </Link>
      </Card>
    </div>
  )
}
