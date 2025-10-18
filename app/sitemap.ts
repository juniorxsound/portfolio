import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/constants'
import fs from 'fs'
import path from 'path'

// Required for static export
export const dynamic = 'force-static'

// Function to get all project slugs from MDX files
async function getProjectSlugs() {
  const projectsDir = path.join(process.cwd(), 'content/projects')

  try {
    const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.mdx'))

    const slugs = await Promise.all(
      files.map(async (file) => {
        const fileName = path.basename(file, '.mdx')

        try {
          const module = await import(`@/content/projects/${fileName}.mdx`)
          const metadata = module.metadata

          if (metadata.path) {
            // Remove leading slash if present
            return metadata.path.replace(/^\//, '')
          } else {
            // Fallback to filename if no path metadata
            return fileName
          }
        } catch (error) {
          console.error(`Error loading project ${fileName}:`, error)
          return fileName
        }
      })
    )

    return slugs
  } catch (error) {
    console.warn('Could not read projects directory:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = await getProjectSlugs()

  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/bio`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Dynamic project pages using actual slugs from MDX metadata
  const projectPages = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...projectPages]
}
