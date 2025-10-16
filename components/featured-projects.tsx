import React, { useMemo } from 'react'
import Link from 'next/link'
import { Project } from '@/types'
import { ProjectCard } from './project-card'
import { Button } from './ui/button'

interface FeaturedProjectsProps {
  projects: Project[]
  limit?: number
}

export function FeaturedProjects({
  projects,
  limit = 6,
}: FeaturedProjectsProps) {
  const featuredProjects = useMemo(
    () =>
      projects
        .filter((project) => project.frontmatter.featured)
        .slice(0, limit),
    [projects, limit]
  )

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Featured Work</h2>
      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.frontmatter.path || 'unknown'}
            project={project}
            className="col-span-1"
          />
        ))}
      </div>

      {/* View All Button */}
      {projects.length > limit && (
        <div className="text-center">
          <Button asChild>
            <Link href="/projects">View All Work</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
