const companies = [
  {
    name: 'Nike',
    src: '/images/logos/nike-company.svg',
    width: 100,
    monochrome: true,
    maxWidth: 48,
  },
  { name: 'Vimeo', src: '/images/logos/vimeo.svg', width: 100, monochrome: true },
  {
    name: 'The New York Times',
    src: '/images/logos/nyt.svg',
    width: 180,
    monochrome: true,
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
  return (
    <section
      aria-label="Organizations I’ve worked with"
      className="relative left-1/2 -mt-4 w-screen -translate-x-1/2 pb-1.5 sm:mt-0 sm:pt-1 sm:pb-2"
    >
      <div className="mx-auto hidden max-w-[1448px] items-center justify-between gap-8 px-8 md:flex">
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
        <div className="flex w-max animate-company-logo-scroll items-center">
          {[0, 1, 2].map((sequence) => (
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
        style={{
          width: 'auto',
          height: 'auto',
          ...(company.maxWidth ? { maxWidth: company.maxWidth } : {}),
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
