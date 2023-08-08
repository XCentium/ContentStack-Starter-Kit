import type { Metadata, ResolvingMetadata } from 'next'
import type { Contentstack } from '@xc/lib/contentstack'

import logger from '@xc/lib/logger/server'

export default function createMetadataGenerator(
  type: string,
  contentstack: Contentstack,
): (page: Core.Page, parent: ResolvingMetadata) => Promise<Metadata> {
  return async (page: Core.Page, parent: ResolvingMetadata) => {
    const result = await contentstack.find<{ open_graph?: Record<string, string> }>(type, null, (query) => {
      return query.where('url', page.params.path).only(['title', 'open_graph']).toJSON()
    })

    if (!result.ok) return {}

    const item = result.data?.shift()

    if (!item?.open_graph) {
      logger.warn(`Metadata Generator: Could not find Open Graph data (Type: '${type}', Path: '${page.params.path}')`)

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
