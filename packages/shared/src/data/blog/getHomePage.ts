import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { blog } from '@xc/shared/clients/contentstack'

export type HomePageData = Contentstack.Item<{
  hero_section: Contentstack.Globals.HeroSection
  open_graph: Contentstack.Globals.OpenGraph
}>

export default async function getHomePage({ preview }: { preview?: LivePreviewQuery }): Promise<Result<HomePageData>> {
  const result = await blog.api.find<HomePageData>('page_home', preview, (query) => {
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
