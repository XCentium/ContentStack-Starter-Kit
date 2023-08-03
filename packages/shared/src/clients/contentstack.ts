import { createURL } from '@xc/lib/http'
import { createContentstackClient } from '@xc/lib/contentstack'
import { createApolloClient } from '@xc/lib/apollo'

export const blog = {
  api: createContentstackClient({
    key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
    token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
    region: process.env.CONTENTSTACK_REGION,
    branch: process.env.CONTENTSTACK_BRANCH,
    preview: {
      enable: process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === 'true',
      host: process.env.NEXT_PUBLIC_CONTENTSTACK_API_HOST,
      token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
    },
  }),
  gql: createApolloClient({
    url: createURL(process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY, {
      origin: process.env.CONTENTSTACK_GRAPHQL_URL,
      search: {
        environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
      },
    }),
    headers: {
      [`branch`]: process.env.CONTENTSTACK_BRANCH,
      [`access_token`]: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    },
  }),
}
