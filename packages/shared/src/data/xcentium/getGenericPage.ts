import type { Query, LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { createClient } from '@xc/shared/clients/contentstack'
import createMetadataGenerator from '@xc/shared/data/createMetadataGenerator'

export type GenericPageData = Contentstack.Item<{
  modular_blocks_main: Record<string, any>[]
  open_graph: Contentstack.Globals.OpenGraph
}>

export const generateMetadata = createMetadataGenerator('', 'page_generic', createClient().api)

export default async function getGenericPage<T = GenericPageData>({
  type,
  path,
  preview,
  builder,
}: {
  type: string
  path: string
  preview?: LivePreviewQuery
  builder?: (query: Query) => Query
}): Promise<Result<T>> {
  const result = await createClient().api.find<T>(type, preview, (query) => {
    let composer: Query = query.where('url', `/${path}`)

    if (builder) {
      composer = builder(composer)
    }

    return composer.toJSON()
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
