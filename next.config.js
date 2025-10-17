const path = require('path')
const createMDX = require('@next/mdx')
const fs = require('fs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL('https://orfleisher.com/**'),
      new URL('https://orfleisher-staging.ue.r.appspot.com/**'),
    ],
  },
  // Serverful deployment on App Engine: use Next.js built-in image optimization
  // and allow SSG/SSR via `next start`.
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '.'),
    }
    return config
  },
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
})

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig)
