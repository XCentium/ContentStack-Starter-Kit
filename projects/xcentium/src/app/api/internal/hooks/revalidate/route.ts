import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import logger from '@xc/lib/logger/server'
import Result from '@xc/lib/Result'
import getSitemapItems from '@xc/shared/data/xcentium/getSitemapItems'

export async function POST(request: Request) {
  const token = request.headers.get('x-webhook-token')

  if (process.env.APP_WEBHOOK_TOKEN !== token) {
    return NextResponse.json(Result.fail('Unauthorized'), { status: 401 })
  }

  const result = await getSitemapItems()
  const items = result.data ?? []

  if (!result.ok) {
    logger.error(result, 'Internal API: Revalidate')
  } else {
    logger.info('Internal API: Triggered static content regeneration')
  }

  // Routes: Dynamic
  items.forEach((item) => revalidatePath(item.url))

  // Routes: Static
  revalidatePath('/sitemap.xml')

  return NextResponse.json(Result.success())
}
