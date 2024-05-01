import Result from '@xc/lib/Result'
import { createClient } from '@xc/shared/clients/contentstack'
import createMetadataGenerator from '@xc/shared/data/createMetadataGenerator'
import GetPostsPageQuery from './queries/GetPostsPageQuery.graphql'

export type PostsPageData = {
  page: {
    title: string
    subtitle: string
    description: string
  }
  posts: [
    {
      title: string
      url: string
      system: {
        created_at: string
      }
    },
  ]
}

export const CONTENT_TYPE = 'page_posts';

export const generateMetadata = createMetadataGenerator('/posts', CONTENT_TYPE, createClient().api)

export default async function getPostsPage(): Promise<Result<PostsPageData>> {
  const response = await createClient().gql.query({
    query: GetPostsPageQuery,
  })

  if (!response || response.error) {
    return Result.fail('Not Found')
  }

  const item: PostsPageData = {
    page: response.data.page.items[0],
    posts: response.data.posts.items,
  }

  return Result.success(item)
}
