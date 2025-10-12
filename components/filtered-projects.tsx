'use client'

import React from 'react'
import Link from 'next/link'
import { Project } from '@/types'
import { useProjectFilters } from '@/hooks/use-project-filters'
import { HorizontalFilters } from './horizontal-filters'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const fm = project.frontmatter
            const tags = Array.isArray(fm.tags) ? fm.tags.join(' / ') : ''
            return (
              <div key={fm.path || 'unknown'} className="col-span-1">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <Link
                    href={`/projects/${fm.path ? fm.path.replace(/^\//, '') : ''}`}
                    className="block"
                  >
                    <div className="overflow-hidden rounded-t-lg">
                      <img
                        alt={fm.path || 'project'}
                        src={`/assets/images/gifs${fm.path || ''}.gif`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {fm.title || 'Untitled Project'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-sm text-muted-foreground mb-2">
                        {tags}
                      </div>
                      <div className="text-sm text-foreground">
                        {fm.excerpt || ''}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            )
          })}
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
