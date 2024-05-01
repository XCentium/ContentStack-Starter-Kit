import Result from '@xc/lib/Result'
import { createClient } from '@xc/shared/clients/contentstack'

export type PostData = Contentstack.Item<{
  title: string
  url: string
  created_at: string
}>
export const CONTENT_TYPE = 'page_post';

export default async function getPosts(): Promise<Result<PostData[]>> {
  const result = await createClient().api.find<PostData>(CONTENT_TYPE, null, (query) => {
    return query.only(['title', 'url', 'created_at']).limit(10).toJSON()
  })

  if (!result.ok) {
    return Result.from(result)
  }

  return Result.success(result.data)
}
