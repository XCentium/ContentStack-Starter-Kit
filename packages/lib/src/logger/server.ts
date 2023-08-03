import pino from 'pino'

if (typeof window !== 'undefined') {
  throw new Error(
    `The 'lib/logger/server' is not compatible with the browser, please use the 'lib/logger/client' instead`,
  )
}

// Pino is a structured logging package.
// See more at: https://getpino.io/#/docs/api
const raw = pino({
  name: 'XCentium',
  level: process.env.LOGGING_LEVEL ?? 'info',
})

const server = {
  info: (message: string) => raw.info(message),
  warn: (message: string) => raw.warn(message),
  error: (data: any, message?: string) => raw.error(data, message),
}

export default server
