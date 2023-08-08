import { notFound } from 'next/navigation'
import getGenericPage, { generateMetadata } from '@xc/shared/data/blog/getGenericPage'

import Contentstack from '@xc/ui/Contentstack'
import HeroSection from '@xc/ui/HeroSection'

export { dynamic, revalidate } from '@/ssr'

export { generateMetadata }

export default async function Page({ params, searchParams }: Core.Page<{ path: string }>) {
  const result = await getGenericPage({ ...params, preview: { ...searchParams } })

  if (!result.ok || !result.data) {
    return notFound()
  }

  return (
    <>
      <Contentstack.ModularBlocks
        entries={result.data.modular_blocks_main}
        components={{
          hero_section: HeroSection,
        }}
      />
    </>
  )
}
