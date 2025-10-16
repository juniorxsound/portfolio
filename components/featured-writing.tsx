import React from 'react'
import { WritingCard } from '@/components/writing-card'
import { Writing } from '@/types'

interface FeaturedWritingProps {
  writing: Writing[]
  limit?: number
}

export function FeaturedWriting({ writing, limit = 6 }: FeaturedWritingProps) {
  if (writing.length === 0) {
    return null
  }

  const featuredWriting = writing.slice(0, limit)

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Featured Writing</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredWriting.map((article) => (
          <WritingCard
            key={article.frontmatter.title || 'unknown'}
            writing={article}
            className="col-span-1"
          />
        ))}
      </div>
    </section>
  )
}
