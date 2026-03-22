import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
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
    <>
      {/* Hero pinned behind the scrolling card */}
      <div className="sticky top-0 h-content">
        <Hero
          title="Or Fleisher is an award-winning creative technologist, developer and artist working at the intersection of technology and storytelling."
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
          className="px-8 text-balance"
        >
          <div className="flex flex-row gap-2">
            <Button variant="default" asChild>
              <Link href="/bio" aria-label="Learn More">
                About
              </Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/projects" aria-label="Projects">
                Work
              </Link>
            </Button>
          </div>
        </Hero>
      </div>

      {/* Scrolling card that slides over the pinned hero */}
      <div className="relative z-10 bg-background shadow-[0_-12px_40px_rgba(0,0,0,0.4)]">
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
    </>
  )
}
