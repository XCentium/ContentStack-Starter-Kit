import dynamic from 'next/dynamic'

const MDXRemote = dynamic(() => import('./MDXRemote'))

export default MDXRemote
