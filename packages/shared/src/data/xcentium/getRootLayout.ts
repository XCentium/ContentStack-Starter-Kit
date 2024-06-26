import Result from '@xc/lib/Result'
import { createClient } from '@xc/shared/clients/contentstack'

export type RootLayoutData = Contentstack.Item<{
  image_header_logo: Contentstack.Fields.File
  mb_header_navigation: {
    item: {
      link: Contentstack.Fields.Link
    }
  }[]
}>

export const CONTENT_TYPE = 'layout_root';

export default async function getRootLayout(): Promise<Result<RootLayoutData>> {
  const result = await createClient().api.find<RootLayoutData>(CONTENT_TYPE, null, (query) => {
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
