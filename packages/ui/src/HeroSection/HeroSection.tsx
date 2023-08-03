import type { ModularBlock } from '@xc/ui/Contentstack'

import Contentstack, { tags } from '@xc/ui/Contentstack'

import css from './HeroSection.module.css'

export default function HeroSection({ data }: ModularBlock<Contentstack.Globals.HeroSection>) {
  if (!data) return null

  return (
    <div className={css.Wrapper}>
      <div className={css.Body}>
        <h1 className={css.Title} {...tags(data, 'title')}>
          {data.title}
        </h1>
        <p className={css.Dscription} {...tags(data, 'description')}>
          {data.description}
        </p>
        <div className={css.Links}>
          <Contentstack.Link className={css.PrimaryLink} data={data.primary_link} />
          <Contentstack.Link className={css.SecondaryLink} data={data.secondary_link} />
        </div>
      </div>
    </div>
  )
}
