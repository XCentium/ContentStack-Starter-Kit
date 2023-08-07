import type { Metadata, ResolvingMetadata } from 'next'
import type Result from '@xc/lib/Result'

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

    if (!result.ok || !result.data?.open_graph) return {}

    return {
      title: result.data.title,
      openGraph: {
        title: result.data.open_graph.og_title,
        description: result.data.open_graph.og_description,
      },
    }
  }
}
