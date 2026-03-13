import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { FilteredProjects } from '@/components/filtered-projects'
import { Container } from '@/components/container'
import { BackButton } from '@/components/back-button'
import { Metadata } from 'next'
import { getProjects } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Projects - Or Fleisher',
    description: 'Projects by Or Fleisher',
    openGraph: {
      title: 'Projects - Or Fleisher',
      description: 'Projects by Or Fleisher',
      images: [
        {
          url: '/images/gifs/skeletron.gif',
          width: 420,
          height: 230,
          alt: 'Skeletron',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@juniorxsound',
      creator: '@juniorxsound',
      title: 'Projects - Or Fleisher',
      description: 'Projects by Or Fleisher',
      images: [
        {
          url: '/images/gifs/skeletron.gif',
          width: 420,
          height: 230,
          alt: 'Skeletron',
        },
      ],
    },
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div>
      <BackButton />
      <Hero
        title="Projects"
        height="sm"
        background="accent"
        mediaParallax
        parallaxSpeed={0.45}
        parallaxMaxOffset={140}
        videoSources={[
          {
            src: '/videos/hero/placeholder-720p.webm',
            type: 'video/webm',
          },
          {
            src: '/videos/hero/placeholder-720p.mp4',
            type: 'video/mp4',
          },
          {
            src: '/videos/hero/placeholder-720p-av1.mp4',
            type: 'video/mp4; codecs=av01',
          },
        ]}
        className="px-8 text-balance"
      />
      <Container className="space-y-8">
        <section id="work">
          <FilteredProjects projects={projects} />
        </section>

        <div className="text-center">
          <Button asChild>
            <Link href="/bio">Learn More</Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}
