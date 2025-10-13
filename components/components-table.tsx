import React from 'react'
import { cn } from '@/lib/utils'

interface ComponentsTableProps {
  components: [string, string][]
  className?: string
}

export function ComponentsTable({ components, className }: ComponentsTableProps) {
  if (!components || components.length === 0) {
    return null
  }

  return (
    <div className={cn('overflow-hidden rounded-lg border', className)}>
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
              Category
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
              Technologies
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {components.map(([category, technologies], index) => (
            <tr key={index} className="hover:bg-muted/25 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-foreground capitalize">
                {category}
              </td>
              <td className="px-4 py-3 text-sm text-muted-foreground">
                {technologies}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
