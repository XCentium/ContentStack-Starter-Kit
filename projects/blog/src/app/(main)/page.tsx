import { notFound } from 'next/navigation'
import getHomePage from '@xc/shared/data/blog/getHomePage'

import HeroSection from '@xc/ui/HeroSection'

export { dynamic, revalidate } from '@/ssr'

export { generateMetadata } from '@xc/shared/data/blog/getHomePage'

export default async function Page({ searchParams }: Core.Page) {
  const result = await getHomePage({ preview: searchParams })

  if (!result.ok || !result.data) {
    return notFound()
  }

  return (
    <>
      <HeroSection data={result.data.hero_section} />
    </>
  )
}
