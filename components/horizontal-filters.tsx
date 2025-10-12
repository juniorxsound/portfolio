'use client'

import React, { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FilterOption } from '@/types'

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

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Tag Filters */}
          <div className="space-y-2">
            <div className="relative">
              {/* Left gradient fade */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

              {/* Right gradient fade */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              {/* Scrollable tags container */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
