import LivePreviewUtils from '@contentstack/live-preview-utils'

import logger from '@xc/lib/logger/client'

export default function initialize() {
  const promise = LivePreviewUtils.init({
    ssr: true,
    enable: true,
    clientUrlParams: {
      host: process.env.NEXT_PUBLIC_CONTENTSTACK_API_HOST,
    },
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
    },
  })

  logger.info('Contentstack Live Preview: Initialization Started')

  promise?.then(() => {
    logger.info('Contentstack Live Preview: Initialization Succeeded')
  })

  promise?.catch((error) => {
    logger.error(error, 'Contentstack Live Preview: Initialization Failed')
  })
}
