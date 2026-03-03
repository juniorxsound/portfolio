import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/constants'
import { getProjectSlugs } from '@/lib/content'

// Required for static export
export const dynamic = 'force-static'

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
