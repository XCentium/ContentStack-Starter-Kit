import dynamic from 'next/dynamic'

const Contentstack = {
  Link: dynamic(() => import('./Link')),
  LivePreview: dynamic(() => import('./LivePreview')),
  ModularBlocks: dynamic(() => import('./ModularBlocks')),
}

export type { ModularBlock } from './ModularBlocks'

export { tags } from './LivePreview'

export default Contentstack
