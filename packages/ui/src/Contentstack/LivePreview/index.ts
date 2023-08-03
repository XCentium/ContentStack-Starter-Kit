import dynamic from 'next/dynamic'

const LivePreview = dynamic(() => import('./LivePreview'))

export { default as tags } from './tags'

export default LivePreview
