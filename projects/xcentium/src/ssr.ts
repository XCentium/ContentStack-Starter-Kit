const livepreview = process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === 'true'

export const dynamic = livepreview ? 'force-dynamic' : 'force-static'

export const revalidate = livepreview ? false : parseInt(process.env.NEXT_REVALIDATE) || Infinity
