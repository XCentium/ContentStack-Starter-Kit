import Result from '@xc/lib/Result'
import { blog } from '@xc/shared/clients/contentstack'

export type PostData = Contentstack.Item<{
  title: string
  url: string
  created_at: string
}>

export default async function getPosts(): Promise<Result<PostData[]>> {
  const result = await blog.api.find<PostData>('page_post', null, (query) => {
    return query.only(['title', 'url', 'created_at']).limit(10).toJSON()
  })

  if (!result.ok) {
    return Result.from(result)
  }

  return Result.success(result.data)
}
