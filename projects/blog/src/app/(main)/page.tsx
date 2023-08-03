import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getHomePage from '@xc/shared/data/blog/getHomePage'

import HeroSection from '@xc/ui/HeroSection'

export { dynamic, revalidate } from '@/ssr'

export const generateMetadata = createMetadataGenerator(() => {
  return getHomePage({})
})

export default async function Page({ searchParams }: Core.Page) {
  const result = await getHomePage({ preview: searchParams })

  if (!result.ok || !result.data) {
    return notFound()
  }

  const data = {
    title: result.data.title,
    hero_section: result.data.hero_section,
  }

  return (
    <>
      <HeroSection data={data.hero_section} />
    </>
  )
}
