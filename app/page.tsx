import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { CompanyLogos } from '@/components/company-logos'
import { FeaturedProjects } from '@/components/featured-projects'
import { FeaturedWriting } from '@/components/featured-writing'
import { Container } from '@/components/container'
import { getFeaturedWriting, getProjects } from '@/lib/content'

export async function generateMetadata() {
  return {
    title: 'Or Fleisher',
    description:
      'Creative technologist, developer and artist working at the intersection of technology and storytelling.',

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
          title="Creative technologist working at the intersection of technology and storytelling"
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
        className="!h-[100svh] text-balance"
        >
          <div className="flex flex-row gap-2">
            <Button variant="secondary" asChild>
              <Link href="/bio" aria-label="Learn More">
                About
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/projects" aria-label="Projects">
                Projects
              </Link>
            </Button>
          </div>
      </Hero>

      <div className="relative z-10 isolate -mt-20 bg-background">
        <Container padding="none" className="flex h-20 items-center px-8">
          <CompanyLogos />
        </Container>

        <Container>
          <section id="featured-work">
            <FeaturedProjects projects={projects} />
          </section>

          {writing.length > 0 && (
            <section id="writing" className="mt-16">
              <FeaturedWriting writing={writing} />
            </section>
          )}
        </Container>
      </div>
    </div>
  )
}
