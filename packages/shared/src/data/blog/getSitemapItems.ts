import type { SitemapItem } from '@xc/lib/sitemap'

import Result from '@xc/lib/Result'
import { blog } from '@xc/shared/clients/contentstack'

export type SitemapItemsData = SitemapItem[]

const getPagesEntries = async (type: string) => {
  const result = await blog.api.find(type, null, (query) => {
    return query.only(['url', 'updated_at']).toJSON()
  })

  return result.data ?? []
}

const toSitemapItems = (pages: any[]) => {
  return pages.map<SitemapItem>((page: any) => ({
    url: page.url,
    date: page.updated_at,
  }))
}

export default async function getSitemapItems(): Promise<Result<SitemapItemsData>> {
  const types = process.env.APP_PAGE_TYPES?.split(',').map((type) => type.trim()) ?? []
  const pages = await Promise.all(types.map((type) => getPagesEntries(type)))
  const items = pages.map((page) => toSitemapItems(page))

  return Result.success(items.flat())
}
