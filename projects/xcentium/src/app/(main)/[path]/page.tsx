import { notFound } from 'next/navigation'
import getGenericPage, { generateMetadata } from '@xc/shared/data/xcentium/getGenericPage'

import Contentstack from '@xc/ui/Contentstack'
import HeroSection from '@xc/ui/HeroSection'

export { dynamic, revalidate } from '@/ssr'

export { generateMetadata }

export default async function Page({ params, searchParams }: Core.Page<{ path: string }>) {
  const result = await getGenericPage({
    type: 'page_generic',
    path: params.path,
    preview: searchParams,
    builder(query) {
      return query
    },
  })

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
