import type { Metadata, ResolvingMetadata } from 'next'
import type Result from '@xc/lib/Result'

import logger from '@xc/lib/logger/server'

export type MetadataGenerator = (
  page: Core.Page,
  parent: ResolvingMetadata,
) => Promise<
  Result<{
    title?: string
    open_graph?: Contentstack.Globals.OpenGraph
  }>
>

export default function createMetadataGenerator(
  generator: MetadataGenerator,
): (page: Core.Page, parent: ResolvingMetadata) => Promise<Metadata> {
  return async (page: Core.Page, parent: ResolvingMetadata) => {
    const result = await generator(page, parent)

    if (!result.ok || !result.data || !result.data.open_graph) {
      logger.error(result, 'Metadata Generator')

      return {}
    }

    return {
      title: result.data.title,
      openGraph: {
        title: result.data.open_graph.og_title,
        description: result.data.open_graph.og_description,
      },
    }
  }
}
