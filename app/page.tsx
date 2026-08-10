import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { FeaturedProjects } from '@/components/featured-projects'
import { FeaturedWriting } from '@/components/featured-writing'
import { CompanyLogos } from '@/components/company-logos'
import { Container } from '@/components/container'
import { getFeaturedWriting, getProjects } from '@/lib/content'

export async function generateMetadata() {
  return {
    title: 'Or Fleisher',
    description:
      'Or Fleisher is a New York-based engineer and creative technologist who solves complex visual problems with code. He specializes in computer graphics, computer vision and data visualization.',

    openGraph: {
      images: [
        {
          url: '/images/gifs/myth.gif',
          width: 420,
          height: 230,
          alt: 'Myth',
        },
      ],
    },
    twitter: {
      images: [
        {
          url: '/images/gifs/myth.gif',
          width: 420,
          height: 230,
          alt: 'Myth',
        },
      ],
    },
  }
}

export default async function HomePage() {
  const [projects, writing] = await Promise.all([
    getProjects(),
    getFeaturedWriting(),
  ])

  return (
    <div>
      <Hero
        title="An engineer who solves complex visual problems with code, specializing in computer graphics, computer vision, and data visualization"
        height="xl"
        background="accent"
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
        className="text-balance"
      >
        <div className="flex flex-row gap-2">
          <Button variant="default" asChild>
            <Link href="/bio" aria-label="Learn More">
              About
            </Link>
          </Button>
          <Button variant="inverse" asChild>
            <Link href="/projects" aria-label="Projects">
              Projects
            </Link>
          </Button>
        </div>
      </Hero>
      <Container>
        <div className="mb-16">
          <CompanyLogos />
        </div>
        <section id="featured-work">
          <FeaturedProjects projects={projects} />
        </section>

        {writing.length > 0 && (
          <section id="writing" className="mt-24">
            <FeaturedWriting writing={writing} />
          </section>
        )}
      </Container>
    </div>
  )
}
