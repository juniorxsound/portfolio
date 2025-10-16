'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FilterOption } from '@/types'
import { useScrollFades } from '@/hooks/use-scroll-fades'

interface HorizontalFiltersProps {
  filterOptions: {
    tags: FilterOption[]
    categories: FilterOption[]
    years: FilterOption[]
  }
  onToggleFilter: (
    type: 'tags' | 'categories' | 'years',
    value: string | number
  ) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function HorizontalFilters({
  filterOptions,
  onToggleFilter,
  onClearFilters,
  hasActiveFilters,
}: HorizontalFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { showLeftFade, showRightFade, scrollContainerRef } = useScrollFades()

  return (
    <div className="space-y-4 font-sans">
      {/* Collapsible Filters Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
        >
          <span>Filters</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              isExpanded && 'rotate-180'
            )}
          />
        </button>
        <div className="h-6">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-xs h-6 px-2"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Tag Filters */}
          <div className="space-y-2">
            <div className="relative">
              {/* Left gradient fade - only shows when scrolled */}
              {showLeftFade && (
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-200" />
              )}

              {/* Right gradient fade - shows when not at end */}
              {showRightFade && (
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-200" />
              )}

              {/* Scrollable tags container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
              >
                {filterOptions.tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => onToggleFilter('tags', tag.id)}
                    className={cn(
                      'px-3 py-1 rounded-full text-sm transition-colors border flex-shrink-0',
                      tag.active
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    {tag.label}
                    <span className="ml-1 text-xs opacity-70">
                      ({tag.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
