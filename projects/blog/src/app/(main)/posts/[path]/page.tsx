import { notFound } from 'next/navigation'
import { serialize } from 'next-mdx-remote/serialize'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getPostPage from '@xc/shared/data/blog/getPostPage'

import MDXRemote from '@xc/ui/MDXRemote'

export { dynamic, revalidate } from '@/ssr'

export const generateMetadata = createMetadataGenerator(({ params }) => {
  return getPostPage({ path: `/posts/${params.path}` })
})

export default async function Page({ params, searchParams }: Core.Page<{ path: string }>) {
  const result = await getPostPage({ path: `/posts/${params.path}`, preview: searchParams })

  if (!result.ok || !result.data) {
    return notFound()
  }

  const data = {
    title: result.data.title,
    description: result.data.description,
    mdx: await serialize(result.data.body),
  }

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data.title}</h1>
      <p className="mb-8">{data.description}</p>
      <div className="prose max-w-full border-t border-t-gray-300 pt-6">
        <MDXRemote mdx={data.mdx} />
      </div>
    </div>
  )
}
