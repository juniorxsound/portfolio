'use client'

import { ArrowLeft } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export function HistoryBackButton() {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/') return null

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push('/')
  }

  return (
    <Button
      variant="default"
      size="icon"
      className="h-9 w-9 bg-white text-black shadow-sm hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90"
      onClick={goBack}
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      <span className="sr-only">Go back</span>
    </Button>
  )
}
