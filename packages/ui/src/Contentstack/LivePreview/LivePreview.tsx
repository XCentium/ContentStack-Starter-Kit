import dynamic from 'next/dynamic'

const LivePreviewInitializer = dynamic(() => import('./LivePreviewInitializer'))

const livepreview = process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === 'true'

export default function LivePreview({ children }: { children: React.ReactNode }) {
  if (!livepreview) return children

  return <LivePreviewInitializer>{children}</LivePreviewInitializer>
}
