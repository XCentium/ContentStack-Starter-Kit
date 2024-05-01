import type { Logger } from './types'

let logger: Logger

if (typeof window !== 'undefined') {
  logger = require('./client').default
} else {
  logger = require('./server').default
}

export default logger
