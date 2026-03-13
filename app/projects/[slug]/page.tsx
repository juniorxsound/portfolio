import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import path from 'path'

// Components
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { BackButton } from '@/components/back-button'
import { Container } from '@/components/container'
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
      <BackButton href="/projects" children="Back to Projects" />
      <Hero
        title={frontmatter.title || 'Untitled Project'}
        subtitle={tags}
        backgroundImage={frontmatter.cover}
        height="xl"
        background="accent"
        mediaParallax
        parallaxSpeed={0.45}
        parallaxMaxOffset={140}
        className="px-8 text-balance"
      >
        <div className="flex flex-row flex-wrap gap-2">
          {(frontmatter.links || []).map((link: [string, string]) => {
            return (
              <Button key={link[0]} asChild>
                <Link
                  href={link[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-1"
                >
                  {link[0]}
                  <ExternalLink className="w-3" aria-hidden="true" />
                </Link>
              </Button>
            )
          })}
        </div>
      </Hero>
      <Container>
        <ProjectComponent />
      </Container>
    </div>
  )
}
