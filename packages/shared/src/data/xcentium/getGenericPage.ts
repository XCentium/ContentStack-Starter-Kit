import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { createClient } from '@xc/shared/clients/contentstack'
import createMetadataGenerator from '@xc/shared/data/createMetadataGenerator'

export type GenericPageData = Contentstack.Item<{
  modular_blocks_main: Record<string, any>[]
  open_graph: Contentstack.Globals.OpenGraph
}>

export const CONTENT_TYPE = 'page_generic';

export const generateMetadata = createMetadataGenerator('', CONTENT_TYPE, createClient().api)

export default async function getGenericPage({
  path,
  preview,
}: {
  path: string
  preview?: LivePreviewQuery
}): Promise<Result<GenericPageData>> {
  const result = await createClient().api.find<GenericPageData>(CONTENT_TYPE, preview, (query) => {
    return query.where('url', `/${path}`).toJSON()
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
