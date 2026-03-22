import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import path from 'path'

// Components
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { Container } from '@/components/container'
import { ScrollCard } from '@/components/scroll-card'
import { getProjectBySlug, getProjectSlugs } from '@/lib/content'

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found - Or Fleisher',
      description: 'The requested project could not be found.',
    }
  }

  return {
    title: `${project.frontmatter.title} - Or Fleisher`,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      images: [
        {
          url: project.frontmatter.animatedThumbnail || '',
          width: 420,
          height: 230,
          alt: project.frontmatter.title,
        },
        {
          url: project.frontmatter.thumbnail?.src || '',
          width: 420,
          height: 230,
          alt: project.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@juniorxsound',
      creator: '@juniorxsound',
      title: `${project.frontmatter.title} - Or Fleisher`,
      description:
        project.frontmatter.excerpt ||
        `Learn more about ${project.frontmatter.title} by Or Fleisher`,
      images: [
        {
          url: project.frontmatter.animatedThumbnail || '',
          width: 420,
          height: 230,
          alt: project.frontmatter.title,
        },
        {
          url: project.frontmatter.thumbnail?.src || '',
          width: 420,
          height: 230,
          alt: project.frontmatter.title,
        },
      ],
    },
    description:
      project.frontmatter.excerpt ||
      `Learn more about ${project.frontmatter.title} by Or Fleisher`,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { frontmatter, filePath } = project
  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags.join(' / ')
    : ''

  // Dynamic import of the MDX component
  const fileName = path.basename(filePath, '.mdx')
  const module = await import(`@/content/projects/${fileName}.mdx`)
  const ProjectComponent = module.default

  return (
    <div>
      {/* Hero pinned behind the scrolling card */}
      <div className="sticky top-0 h-content -mt-16">
        <Hero
          title={frontmatter.title || 'Untitled Project'}
          subtitle={tags}
          backgroundImage={frontmatter.cover}
          height="xl"
          background="accent"
          className="px-8 text-balance"
        >
          <div className="flex flex-row flex-wrap gap-2">
            {(frontmatter.links || []).map((link: [string, string]) => {
              return (
                <Button key={link[0]} asChild>
                  <a
                    href={link[1]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row gap-1"
                  >
                    {link[0]}
                    <ExternalLink className="w-3" aria-hidden="true" />
                  </a>
                </Button>
              )
            })}
          </div>
        </Hero>
      </div>

      {/* Scrolling card that slides over the pinned hero */}
      <ScrollCard>
        <Container>
          <ProjectComponent />
        </Container>
      </ScrollCard>
    </div>
  )
}
