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

      <div className="relative overflow-hidden px-8 sm:px-12 md:hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-24"
        />
        <div className="flex w-max animate-company-logo-scroll items-center motion-reduce:animate-none">
          {[0, 1].map((sequence) => (
            <div
              key={sequence}
              className="flex items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
            >
              {companies.map((company) => (
                <CompanyLogo
                  key={`${company.name}-${sequence}`}
                  company={company}
                  decorative={sequence > 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CompanyLogo({
  company,
  decorative = false,
}: {
  company: (typeof companies)[number]
  decorative?: boolean
}) {
  return (
    <div
      className="flex h-6 shrink-0 items-center justify-center"
      aria-hidden={decorative}
    >
      <img
        src={company.src}
        alt={decorative ? '' : company.name}
        width={company.width}
        height={24}
        loading="lazy"
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
