import { notFound } from 'next/navigation'
import { serialize } from 'next-mdx-remote/serialize'
import getPostPage, { generateMetadata } from '@xc/shared/data/xcentium/getPostPage'
import { tags } from '@xc/ui/Contentstack'

import MDXRemote from '@xc/ui/MDXRemote'

export { dynamic, revalidate } from '@/ssr'

export { generateMetadata }

export default async function Page({ params, searchParams }: Core.Page<{ path: string }>) {
  const result = await getPostPage({ ...params, preview: { ...searchParams } })

  if (!result.ok || !result.data) {
    return notFound()
  }

  const mdx = await serialize(result.data.body)

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl" {...tags(result.data, 'title')}>
        {result.data.title}
      </h1>
      <p className="mb-8" {...tags(result.data, 'description')}>
        {result.data.description}
      </p>
      <div className="prose max-w-full border-t border-t-gray-300 pt-6" {...tags(result.data, 'body')}>
        <MDXRemote mdx={mdx} />
      </div>
    </div>
  )
}
