import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/constants'
import fs from 'fs'
import path from 'path'

// Function to get all MDX files from content/projects directory
function getProjectFiles() {
  const projectsDir = path.join(process.cwd(), 'content/projects')

  try {
    const files = fs.readdirSync(projectsDir)
    return files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace('.mdx', ''))
  } catch (error) {
    console.warn('Could not read projects directory:', error)
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const projectFiles = getProjectFiles()

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

  // Dynamic project pages
  const projectPages = projectFiles.map((project) => ({
    url: `${BASE_URL}/projects/${project}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...projectPages]
}
