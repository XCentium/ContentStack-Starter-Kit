import dynamic from 'next/dynamic'

const HeroSection = dynamic(() => import('./HeroSection'))

export default HeroSection
