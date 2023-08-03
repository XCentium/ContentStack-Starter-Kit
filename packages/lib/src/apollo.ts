import type { ApolloCache, NormalizedCacheObject } from '@apollo/client'

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from '@apollo/client'

const ssr = typeof window === 'undefined'
const clients: Record<string, ApolloClient<any>> = {}

// This function retrieves an Apollo Client or generates a new one. However, it is
// important to note that it will consistently return a fresh client if executed
// on the server side (when the 'window' object is undefined). Conversely, it will
// reuse the existing client if executed on the client side.
export function createApolloClient(options: {
  url: URL
  headers?: Record<string, string>
  cache?: ApolloCache<NormalizedCacheObject>
}) {
  const uri = options.url.toString()

  let client: ApolloClient<any> | undefined = clients[uri]

  if (client && !ssr) return client

  options.headers = options.headers ?? {}

  if (!options.cache) {
    options.cache = new InMemoryCache({ resultCacheMaxSize: 0 })
  }

  const middleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: { ...headers, ...options.headers },
    }))

    return forward(operation)
  })

  client = clients[uri] = new ApolloClient({
    ssrMode: ssr,
    link: concat(middleware, new HttpLink({ uri })),
    cache: options.cache,
  })

  return client
}
