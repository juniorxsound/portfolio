'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const companies = [
  {
    name: 'Nike',
    src: '/images/logos/nike-company.svg',
    width: 100,
    monochrome: true,
    maxWidth: 48,
  },
  {
    name: 'Vimeo',
    src: '/images/logos/vimeo.svg',
    width: 100,
    monochrome: true,
    maxHeight: 28,
  },
  {
    name: 'The New York Times',
    src: '/images/logos/nyt.svg',
    width: 180,
    monochrome: true,
    maxHeight: 26,
  },
  { name: 'Google', src: '/images/logos/google.svg', width: 110 },
  {
    name: 'Viacom',
    src: '/images/logos/viacom.svg',
    width: 120,
    maxWidth: 80,
  },
  {
    name: 'New York University',
    src: '/images/logos/nyu.svg',
    width: 100,
    monochrome: true,
  },
]

export function CompanyLogos() {
  const [logosReady, setLogosReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    Promise.all(
      companies.map(
        ({ src }) =>
          new Promise<void>((resolve) => {
            const image = new Image()
            image.onload = () => resolve()
            image.onerror = () => resolve()
            image.src = src
            if (image.complete) resolve()
          })
      )
    ).then(() => {
      if (!cancelled) setLogosReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section
      aria-label="Organizations I’ve worked with"
      className={cn(
        'relative left-1/2 w-screen -translate-x-1/2 transition-opacity duration-150 ease-out motion-reduce:transition-none',
        logosReady ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="mx-auto hidden max-w-6xl items-center justify-between gap-8 px-8 md:flex">
        {companies.map((company) => (
          <CompanyLogo key={company.name} company={company} />
        ))}
      </div>

      <div className="company-logo-marquee md:hidden">
        <div className="company-logo-marquee-group">
          {companies.map((company) => (
            <CompanyLogo key={company.name} company={company} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CompanyLogo({
  company,
}: {
  company: (typeof companies)[number]
}) {
  return (
    <div
      className="flex h-6 shrink-0 items-center justify-center"
    >
      <img
        src={company.src}
        alt={company.name}
        width={company.width}
        height={24}
        loading="eager"
        decoding="async"
        style={{
          width: 'auto',
          height: 'auto',
          ...(company.maxWidth ? { maxWidth: company.maxWidth } : {}),
          ...(company.maxHeight ? { maxHeight: company.maxHeight } : {}),
        }}
        className={`h-auto max-h-6 w-auto max-w-full ${
          company.monochrome
            ? 'invert dark:invert-0'
            : 'brightness-0 dark:invert'
        }`}
      />
    </div>
  )
}
