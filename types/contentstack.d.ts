/// <reference types="node" />
/// <reference types="next" />
/// <reference types="next/image-types/global" />

//
// Stack (Contentstack)

declare namespace Contentstack {
  // Item

  type Item<T = Record<string, any>> = T & {
    uid: string
    title: string
    locale: string
    created_by: string
    updated_by: string
    created_at: string
    updated_at: string
  }

  // Fields

  namespace Fields {
    type SingleLineTextbox = unknown

    type MultiLineTextbox = unknown

    type RichTextEditor = unknown

    type JSONRichTextEditor = unknown

    type Markdown = unknown

    type Select = unknown

    type ModularBlocks = unknown

    type Number = unknown

    type Boolean = unknown

    type Date = unknown

    type File = {
      content_type: string
      file_size: string
      filename: string
      title: string
      url: url
    }

    type Link = {
      title: string
      href: string
    }

    type Reference = unknown

    type Group = unknown

    type Custom = unknown
  }

  // Globals

  namespace Globals {
    type GoogleTagManager = {
      enabled: boolean
      container_id: string
    }

    type HeroSection = {
      variation: 'default' | 'left'
      title: string
      description: string
      primary_link: Contentstack.Fields.Link
      secondary_link: Contentstack.Fields.Link
    }

    type OpenGraph = {
      og_title: string
      og_description: string
    }
  }
}
