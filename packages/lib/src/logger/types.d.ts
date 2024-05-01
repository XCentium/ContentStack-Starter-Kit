export interface Logger {
  info: (message: string) => void
  warn: (message: string) => void
  error: (data: any, message?: string) => void
}
