import type { Query, LivePreviewQuery } from 'contentstack'

import { Stack, Region } from 'contentstack'
import { addEditableTags } from '@contentstack/utils'
import logger from '@xc/lib/logger/server'
import Result from '@xc/lib/Result'

export type Options = {
  key: string
  token: string
  environment: string
  region: keyof typeof Region
  branch: string
  preview: {
    enable: boolean
    host: string
    token: string
  }
}

if (typeof window !== 'undefined') {
  throw new Error(`The 'lib/contentstack' is not compatible with the browser`)
}

export class Contentstack {
  private options: Options
  private stack: Stack

  constructor(options: Options) {
    this.options = options
    this.stack = this.create()
  }

  async find<T = Record<string, any>>(
    type: string,
    preview: LivePreviewQuery | null | undefined,
    builder: (query: Query) => Query,
  ): Promise<Result<Contentstack.Item<T>[]>> {
    try {
      this.setLivePreviewQuery(preview)

      const stack = this.stack.ContentType(type).Query()
      const query = builder(stack)
      const items = await query.find()

      this.setEditableTags(type, preview, items)

      return Result.success(items.flat())
    } catch (error) {
      const traceId = crypto.randomUUID()

      logger.error(error, `Contentstack (Trace ID '${traceId}'): Query for type '${type}'`)

      return Result.fail('Woops', { traceId })
    }
  }

  private setLivePreviewQuery(preview: LivePreviewQuery | null | undefined) {
    if (!this.options.preview.enable) return
    if (!preview?.live_preview || !preview?.content_type_uid) return

    this.stack.livePreviewQuery(preview)
  }

  private setEditableTags(type: string, preview: LivePreviewQuery | null | undefined, items: any[][]) {
    if (!this.options.preview.enable) return
    if (!preview?.live_preview || !preview?.content_type_uid) return

    addEditableTags(items[0][0], type, true)
  }

  private create() {
    return new Stack({
      api_key: this.options.key,
      delivery_token: this.options.token,
      environment: this.options.environment,
      region: Region[this.options.region],
      branch: this.options.branch,
      live_preview: {
        enable: this.options.preview.enable,
        host: this.options.preview.host,
        management_token: this.options.preview.token,
      },
    })
  }
}

export function createContentstackClient(options: Options) {
  return new Contentstack(options)
}
