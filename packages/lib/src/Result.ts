export default class Result<T = any> {
  constructor(ok: boolean) {
    this.ok = ok
  }

  ok: boolean
  data?: T
  error?: string
  metadata?: Record<string, any>

  static is(source: any): boolean {
    return source !== null && typeof source === 'object' && source.hasOwnProperty('ok')
  }

  static success<T>(data?: T): Result<T> {
    const result = new Result<T>(true)

    result.data = data

    return result
  }

  static fail<T>(error: string, metadata?: Record<string, any>): Result<T> {
    const result = new Result<T>(false)

    result.error = error
    result.metadata = metadata

    return result
  }

  static from<T>(source: Record<string, any>, data: boolean = false): Result<T> {
    const result = new Result<T>(source.ok)

    if (data) {
      result.data = source.data
    }

    result.error = source.error
    result.metadata = source.metadata

    return result
  }
}
