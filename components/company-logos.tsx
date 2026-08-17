type Company = {
  name: string
  src: string
  width: number
  monochrome?: boolean
  maxWidth?: number
  maxHeight?: number
  compactMaxWidth?: number
}

const companies: Company[] = [
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
    compactMaxWidth: 60,
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
      className="w-full"
    >
      <div className="mx-auto hidden max-w-6xl grid-cols-6 items-center gap-8 px-8 md:grid">
        {companies.map((company) => (
          <CompanyLogo key={company.name} company={company} />
        ))}
      </div>

      <div className="company-logo-marquee motion-reduce:hidden md:hidden">
        <div className="company-logo-marquee-track">
          {[false, true].map((isDuplicate) => (
            <div
              key={isDuplicate ? 'duplicate' : 'original'}
              className="company-logo-marquee-group"
              aria-hidden={isDuplicate || undefined}
            >
              {companies.map((company) => (
                <CompanyLogo
                  key={company.name}
                  company={company}
                  compact
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto hidden max-w-sm grid-cols-3 items-center gap-x-6 gap-y-7 px-6 motion-reduce:grid md:hidden">
        {companies.map((company) => (
          <CompanyLogo key={company.name} company={company} compact />
        ))}
      </div>
    </section>
  )
}

function CompanyLogo({
  company,
  compact = false,
}: {
  company: Company
  compact?: boolean
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center ${
        compact ? 'h-5 w-fit justify-self-center' : 'h-6'
      }`}
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
          ...(compact && company.compactMaxWidth
            ? { maxWidth: company.compactMaxWidth }
            : {}),
          ...(company.maxHeight ? { maxHeight: company.maxHeight } : {}),
        }}
        className={`h-auto w-auto max-w-full ${
          compact ? 'max-h-5' : 'max-h-6'
        } ${
          company.monochrome
            ? 'invert dark:invert-0'
            : 'brightness-0 dark:invert'
        }`}
      />
    </div>
  )
}
