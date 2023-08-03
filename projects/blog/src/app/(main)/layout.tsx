import getRootLayot from '@xc/shared/data/blog/getRootLayout'

import Contentstack from '@xc/ui/Contentstack'
import { Root } from '@/layout'

export default async function Layout({ children }: Core.Layout) {
  const result = await getRootLayot()

  return (
    <>
      <Contentstack.LivePreview>
        <Root data={result.data}>{children}</Root>
      </Contentstack.LivePreview>
    </>
  )
}
