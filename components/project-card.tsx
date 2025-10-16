import React from 'react'
import Link from 'next/link'
import { Project } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const fm = project.frontmatter
  const tags = Array.isArray(fm.tags) ? fm.tags.join(' / ') : ''

  return (
    <div className={className}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
        <Link
          href={`/projects/${fm.path ? fm.path.replace(/^\//, '') : ''}`}
          className="block"
        >
          <div className="overflow-hidden rounded-t-lg relative">
            <img
              alt={fm.path || 'project'}
              src={`/images/gifs${fm.path || ''}.gif`}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {fm.badge && (
              <div className="absolute top-4 left-4 bg-accent/95 rounded-md px-2 py-1 flex items-center justify-center gap-1">
                <img
                  src={fm.badge}
                  alt="Project badge"
                  className="max-h-5 max-w-20 w-auto h-auto invert dark:invert-0"
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
            <div className="text-sm text-foreground">{fm.excerpt || ''}</div>
          </CardContent>
        </Link>
      </Card>
    </div>
  )
}
