import dynamic from 'next/dynamic'

const Header = dynamic(() => import('./Header'))

export default Header
