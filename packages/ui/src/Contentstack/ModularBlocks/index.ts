import dynamic from 'next/dynamic'

const ModularBlocks = dynamic(() => import('./ModularBlocks'))

export type { ModularBlock } from './ModularBlocks'

export default ModularBlocks
