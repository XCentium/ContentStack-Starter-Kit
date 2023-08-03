import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { blog } from '@xc/shared/clients/contentstack'

export type GenericPageData = Contentstack.Item<{
  modular_blocks_main: Record<string, any>[]
  open_graph: Contentstack.Globals.OpenGraph
}>

export default async function getGenericPage({
  path,
  preview,
}: {
  path: string
  preview?: LivePreviewQuery
}): Promise<Result<GenericPageData>> {
  const result = await blog.api.find<GenericPageData>('page_generic', preview, (query) => {
    return query.where('url', path).toJSON()
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
