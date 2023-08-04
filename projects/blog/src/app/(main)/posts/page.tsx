import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getPostsPage from '@xc/shared/data/blog/getPostsPage'

import Link from 'next/link'

export { dynamic, revalidate } from '@/ssr'

export const generateMetadata = createMetadataGenerator(() => {
  return getPostsPage().then(({ ok, error, data }) => {
    return { ok, error, data: data?.page }
  })
})

const toLocaleDateString = (value: string) => {
  const date = new Date(value)

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  })
}

export default async function Page({}: Core.Page<{ path: string }>) {
  const result = await getPostsPage()

  if (!result.ok || !result.data) {
    return notFound()
  }

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{result.data.page.subtitle}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{result.data.page.title}</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">{result.data.page.description}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl">
        <ul role="list" className="divide-y divide-gray-100">
          {result.data.posts.map((post) => (
            <li key={post.url} className="flex items-center justify-between gap-x-6 py-5">
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{post.title}</p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="whitespace-nowrap">
                    <time dateTime={post.system.created_at}>{toLocaleDateString(post.system.created_at)}</time>
                  </p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <Link
                  className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                  href={post.url}
                >
                  Read
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
