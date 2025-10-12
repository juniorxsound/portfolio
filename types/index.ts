export interface Project {
  frontmatter: {
    title?: string
    date?: string
    path?: string
    tags?: string[]
    thumbnail?: string
    cover?: string
    embed?: string
    about?: string
    credits?: string
    components?: [string, string][]
    press?: [string, string][]
    links?: [string, string][]
    excerpt?: string
    category?: string
    year?: number
    [key: string]: any // Allow additional properties from frontmatter
  }
  filePath: string
}

export interface FilterOption {
  id: string
  label: string
  count: number
  active: boolean
}

export interface ProjectFilters {
  tags: string[]
  categories: string[]
  years: number[]
}

export type FilterType = 'tags' | 'categories' | 'years'

// Component interfaces removed - using shadcn/ui and Tailwind directly

export interface Metadata {
  title: string
  description: string
  keywords?: string
  openGraph?: {
    title: string
    description: string
    url: string
    siteName: string
    images: Array<{
      url: string
      width: number
      height: number
      alt: string
    }>
    locale: string
    type: string
  }
  twitter?: {
    card: string
    site: string
    creator: string
    title: string
    description: string
    images: string[]
  }
}
