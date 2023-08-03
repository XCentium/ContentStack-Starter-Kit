import type { RootLayoutData } from '@xc/shared/data/blog/getRootLayout'

import Link from 'next/link'
import Image from 'next/image'
import Contentstack from '@xc/ui/Contentstack'

import css from './Header.module.css'

export default function Header({ data }: { data: RootLayoutData | null | undefined }) {
  if (!data) return null

  return (
    <div className={css.Wrapper}>
      <div className={css.Container}>
        <div className={css.Left}>
          <Link href="/">
            <Image src={data.image_header_logo.url} alt={data.image_header_logo.title} width={180} height={40} />
          </Link>
        </div>
        <div className={css.Center}>
          <div className={css.Navigation}>
            {data.mb_header_navigation.map(({ item }) => (
              <Contentstack.Link key={item.link.href} data={item.link} />
            ))}
          </div>
        </div>
        <div className={css.Right}></div>
      </div>
    </div>
  )
}
