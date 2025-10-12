'use client'

import { useState, useMemo, useCallback } from 'react'
import { Project, ProjectFilters, FilterOption } from '@/types'

export function useProjectFilters(projects: Project[]) {
  const [filters, setFilters] = useState<ProjectFilters>({
    tags: [],
    categories: [],
    years: [],
  })

  // Extract all unique filter options from projects
  const filterOptions = useMemo(() => {
    const tags = new Map<string, number>()
    const categories = new Map<string, number>()
    const years = new Map<number, number>()

    projects.forEach((project) => {
      const { frontmatter } = project

      // Count tags
      if (frontmatter.tags) {
        frontmatter.tags.forEach((tag) => {
          tags.set(tag, (tags.get(tag) || 0) + 1)
        })
      }

      // Count categories
      if (frontmatter.category) {
        categories.set(
          frontmatter.category,
          (categories.get(frontmatter.category) || 0) + 1
        )
      }

      // Count years
      if (frontmatter.date) {
        const year = new Date(frontmatter.date).getFullYear()
        years.set(year, (years.get(year) || 0) + 1)
      }
    })

    return {
      tags: Array.from(tags.entries())
        .map(([tag, count]) => ({
          id: tag,
          label: tag,
          count,
          active: filters.tags.includes(tag),
        }))
        .sort((a, b) => b.count - a.count),

      categories: Array.from(categories.entries())
        .map(([category, count]) => ({
          id: category,
          label: category,
          count,
          active: filters.categories.includes(category),
        }))
        .sort((a, b) => b.count - a.count),

      years: Array.from(years.entries())
        .map(([year, count]) => ({
          id: year.toString(),
          label: year.toString(),
          count,
          active: filters.years.includes(year),
        }))
        .sort((a, b) => parseInt(b.id) - parseInt(a.id)),
    }
  }, [projects, filters.tags, filters.categories, filters.years])

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const { frontmatter } = project
      const { tags, categories, years } = filters

      // Tags filter
      if (tags.length > 0) {
        const hasMatchingTag = frontmatter.tags?.some((tag) =>
          tags.includes(tag)
        )
        if (!hasMatchingTag) return false
      }

      // Categories filter
      if (categories.length > 0) {
        if (
          !frontmatter.category ||
          !categories.includes(frontmatter.category)
        ) {
          return false
        }
      }

      // Years filter
      if (years.length > 0) {
        if (!frontmatter.date) return false
        const projectYear = new Date(frontmatter.date).getFullYear()
        if (!years.includes(projectYear)) return false
      }

      return true
    })
  }, [projects, filters])

  // Filter actions
  const toggleFilter = useCallback(
    (type: keyof ProjectFilters, value: string | number) => {
      setFilters((prev) => {
        const currentArray = prev[type] as (string | number)[]
        const newArray = currentArray.includes(value)
          ? currentArray.filter((item) => item !== value)
          : [...currentArray, value]

        return {
          ...prev,
          [type]: newArray,
        }
      })
    },
    []
  )

  const clearFilters = useCallback(() => {
    setFilters({
      tags: [],
      categories: [],
      years: [],
    })
  }, [])

  const hasActiveFilters = useMemo(() => {
    return (
      filters.tags.length > 0 ||
      filters.categories.length > 0 ||
      filters.years.length > 0
    )
  }, [filters])

  return {
    filters,
    filterOptions,
    filteredProjects,
    toggleFilter,
    clearFilters,
    hasActiveFilters,
  }
}
