const cli = typeof window !== 'undefined'
const dev = process.env.NODE_ENV !== 'production'

const client = {
  info: (message: string) => cli && dev && console.info(message),
  warn: (message: string) => cli && dev && console.warn(message),
  error: (data: any, message?: string) => cli && dev && console.error(data, message),
}

export default client
