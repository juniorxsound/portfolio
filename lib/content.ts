import fs from 'fs'
import path from 'path'
import { cache } from 'react'
import type { Project, Writing } from '@/types'

const projectsDir = path.join(process.cwd(), 'content/projects')
const writingDir = path.join(process.cwd(), 'content/writing')

function sortByDateDesc<T extends { frontmatter: { date?: string } }>(
  items: T[]
): T[] {
  return items.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || '')
    const dateB = new Date(b.frontmatter.date || '')
    return dateB.getTime() - dateA.getTime()
  })
}

function slugFromProject(project: Project): string {
  const pathSlug = project.frontmatter.path?.replace(/^\//, '')
  if (pathSlug) return pathSlug
  return path.basename(project.filePath, '.mdx')
}

export function getRelatedProjects(
  currentProject: Project,
  projects: Project[],
  limit = 3
): Project[] {
  const currentTags = new Set(
    (currentProject.frontmatter.tags || []).map((tag) => tag.toLowerCase())
  )
  const currentCategory = currentProject.frontmatter.category
  const currentBadge = currentProject.frontmatter.badge

  return projects
    .filter((project) => slugFromProject(project) !== slugFromProject(currentProject))
    .map((project) => {
      const sharedTags = (project.frontmatter.tags || []).filter((tag) =>
        currentTags.has(tag.toLowerCase())
      ).length
      const sharedCategory =
        currentCategory && project.frontmatter.category === currentCategory ? 1 : 0
      const sharedCompany =
        currentBadge && project.frontmatter.badge === currentBadge ? 1 : 0

      return { project, score: sharedTags * 3 + sharedCategory * 2 + sharedCompany }
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.project.frontmatter.date || 0).getTime() -
          new Date(a.project.frontmatter.date || 0).getTime()
    )
    .slice(0, limit)
    .map(({ project }) => project)
}

export const getProjects = cache(async (): Promise<Project[]> => {
  let files: string[] = []
  try {
    files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.mdx'))
  } catch {
    return []
  }

  const projects = await Promise.all(
    files.map(async (file) => {
      const fileName = path.basename(file, '.mdx')
      const fullPath = path.join(projectsDir, file)

      try {
        const module = await import(`@/content/projects/${fileName}.mdx`)
        const metadata = module.metadata

        return {
          frontmatter: {
            ...metadata,
            tags: metadata.tags || [],
            components: metadata.components || [],
            press: metadata.press || [],
            links: metadata.links || [],
          } as Project['frontmatter'],
          filePath: fullPath,
        } satisfies Project
      } catch (error) {
        console.error(`Error loading project ${fileName}:`, error)
        return null
      }
    })
  )

  return sortByDateDesc(
    projects.filter((project): project is Project => project !== null)
  )
})

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    const projects = await getProjects()
    return (
      projects.find((project) => slugFromProject(project) === slug) ?? null
    )
  }
)

export const getProjectSlugs = cache(async (): Promise<string[]> => {
  const projects = await getProjects()
  return projects.map(slugFromProject)
})

export const getWriting = cache(async (): Promise<Writing[]> => {
  if (!fs.existsSync(writingDir)) {
    return []
  }

  const files = fs.readdirSync(writingDir).filter((f) => f.endsWith('.mdx'))

  const writing = await Promise.all(
    files.map(async (file) => {
      const fileName = path.basename(file, '.mdx')
      const fullPath = path.join(writingDir, file)

      try {
        const module = await import(`@/content/writing/${fileName}.mdx`)
        const metadata = module.metadata

        return {
          frontmatter: metadata as Writing['frontmatter'],
          filePath: fullPath,
        } satisfies Writing
      } catch (error) {
        console.error(`Error loading writing ${fileName}:`, error)
        return null
      }
    })
  )

  return sortByDateDesc(
    writing.filter((article): article is Writing => article !== null)
  )
})

export const getFeaturedWriting = cache(async (): Promise<Writing[]> => {
  const writing = await getWriting()
  return writing.filter((article) => article.frontmatter.featured === true)
})
