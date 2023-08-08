import type { Metadata, ResolvingMetadata } from 'next'
import type { Contentstack } from '@xc/lib/contentstack'

import logger from '@xc/lib/logger/server'

export default function createMetadataGenerator(
  path: string,
  type: string,
  contentstack: Contentstack,
): (page: Core.Page, parent: ResolvingMetadata) => Promise<Metadata> {
  return async (page: Core.Page, parent: ResolvingMetadata) => {
    let url = path

    if (page.params.path) {
      url = path ? `${path}/${page.params.path}` : `/${page.params.path}`
    }

    const result = await contentstack.find(type, null, (query) => {
      return query.where('url', url).only(['title', 'open_graph']).toJSON()
    })

    if (!result.ok) return {}

    const item = result.data?.shift()

    if (!item?.open_graph) {
      logger.warn(`Metadata Generator: Could not find Open Graph data (Path: '${url}', Type: '${type}')`)

      return {}
    }

    return {
      title: item.title,
      openGraph: {
        title: item.open_graph.og_title,
        description: item.open_graph.og_description,
      },
    }
  }
}
