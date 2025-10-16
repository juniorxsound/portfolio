'use client'

import React from 'react'
import { Project } from '@/types'
import { useProjectFilters } from '@/hooks/use-project-filters'
import { HorizontalFilters } from './horizontal-filters'
import { ProjectCard } from './project-card'

interface FilteredProjectsProps {
  projects: Project[]
}

export function FilteredProjects({ projects }: FilteredProjectsProps) {
  const {
    filterOptions,
    filteredProjects,
    toggleFilter,
    clearFilters,
    hasActiveFilters,
  } = useProjectFilters(projects)

  return (
    <div className="space-y-8">
      {/* Horizontal Filters */}
      <HorizontalFilters
        filterOptions={filterOptions}
        onToggleFilter={toggleFilter}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.frontmatter.path || 'unknown'}
              project={project}
              className="col-span-1"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No projects found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  )
}
