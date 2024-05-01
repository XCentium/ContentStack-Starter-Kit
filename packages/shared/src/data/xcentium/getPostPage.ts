import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { createClient } from '@xc/shared/clients/contentstack'
import createMetadataGenerator from '@xc/shared/data/createMetadataGenerator'

export type PostPageData = Contentstack.Item<{
  description: string
  body: string
  open_graph: Contentstack.Globals.OpenGraph
}>

export const CONTENT_TYPE = 'page_post';

export const generateMetadata = createMetadataGenerator('/posts', CONTENT_TYPE, createClient().api)

export default async function getPostPage({
  path,
  preview,
}: {
  path: string
  preview?: LivePreviewQuery
}): Promise<Result<PostPageData>> {
  const result = await createClient().api.find<PostPageData>(CONTENT_TYPE, preview, (query) => {
    return query.where('url', `/posts/${path}`).toJSON()
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
