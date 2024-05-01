import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { createClient } from '@xc/shared/clients/contentstack'
import createMetadataGenerator from '@xc/shared/data/createMetadataGenerator'

export type HomePageData = Contentstack.Item<{
  hero_section: Contentstack.Globals.HeroSection
  open_graph: Contentstack.Globals.OpenGraph
}>

export const generateMetadata = createMetadataGenerator('/', 'page_home', createClient().api)

export default async function getHomePage({ preview }: { preview?: LivePreviewQuery }): Promise<Result<HomePageData>> {
  const result = await createClient().api.find<HomePageData>('page_home', preview, (query) => {
    return query.toJSON()
  })

  if (!result.ok) {
    return Result.from(result)
  }

  const item = result.data?.shift()

  if (!item) {
    return Result.fail('Not Found')
  }

  return Result.success(item)
}
