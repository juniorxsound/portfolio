import Image from 'next/image'

const logoDimensions: Record<string, { width: number; height: number }> = {
  '/images/logos/nyt.svg': { width: 300, height: 60 },
  '/images/logos/nyu.svg': { width: 106, height: 36 },
  '/images/logos/vimeo.svg': { width: 120, height: 60 },
  '/images/logos/nike.svg': { width: 120, height: 60 },
}

export function BadgeLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      {...(logoDimensions[src] ?? { width: 80, height: 20 })}
      loading="lazy"
      unoptimized
      style={{ width: 'auto', height: 'auto' }}
      className="max-h-5 max-w-20 invert dark:invert-0"
    />
  )
}
