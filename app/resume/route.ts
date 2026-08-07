import { createResumePdf } from '@/lib/resume-pdf'

export const revalidate = 86400
export const runtime = 'nodejs'

export async function GET() {
  const pdf = await createResumePdf()

  return new Response(new Uint8Array(pdf), {
    headers: {
      'Cache-Control':
        'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      'Content-Disposition': 'inline; filename="Or-Fleisher-Resume.pdf"',
      'Content-Length': String(pdf.byteLength),
      'Content-Type': 'application/pdf',
    },
  })
}
