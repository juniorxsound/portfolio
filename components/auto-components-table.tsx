import React from 'react'
import { ProjectComponents } from './project-components'

interface AutoComponentsTableProps {
  components: [string, string][]
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  title?: string
}

export function AutoComponentsTable({
  components,
  size = 'sm',
  className,
  title = 'Technologies Used',
}: AutoComponentsTableProps) {
  if (!components || components.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <h3 className="mb-4 text-foreground">{title}</h3>
      <ProjectComponents components={components} size={size} />
    </div>
  )
}
