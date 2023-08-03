/// <reference types="node" />
/// <reference types="next" />
/// <reference types="next/image-types/global" />

//
// Standard

interface Window {}

//
// NodeJS

declare namespace NodeJS {
  interface ProcessEnv {
    // Node
    readonly NODE_ENV: 'development' | 'production' | 'test'
    // Logging
    readonly LOGGING_LEVEL: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent'
    // Next
    readonly NEXT_PHASE: string | undefined
    readonly NEXT_REVALIDATE: string
    readonly NEXT_BASE_URL: string
    readonly NEXT_PUBLIC_BASE_URL: string
    // Contentstack
    readonly CONTENTSTACK_REGION: 'US' | 'EU' | 'AZURE_NA' | 'AZURE_EU'
    readonly CONTENTSTACK_BRANCH: string
    readonly CONTENTSTACK_APP_HOST: string
    readonly CONTENTSTACK_GRAPHQL_URL: string
    readonly CONTENTSTACK_DELIVERY_TOKEN: string
    readonly CONTENTSTACK_MANAGEMENT_TOKEN: string
    readonly NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW: string
    readonly NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT: string
    readonly NEXT_PUBLIC_CONTENTSTACK_API_KEY: string
    readonly NEXT_PUBLIC_CONTENTSTACK_API_HOST: string
    // Application
    readonly APP_WEBHOOK_TOKEN: string
    readonly APP_PAGE_TYPES: string
  }
}

//
// GraphQL

declare module '*.graphql' {
  import type { DocumentNode } from 'graphql'

  const Schema: DocumentNode

  export = Schema
}
