import Link from 'next/link'
import NavStyles from './styles/NavStyles'

const Nav = () => (
  <NavStyles>
     <Link href="/"><a>home</a></Link>
   <Link href= "/items "><a>shop</a></Link>
   <Link href="/sell"><a>sell</a></Link>
   <Link href="/signup"><a>signup</a></Link>
   <Link href="/orders"><a>orders</a></Link>
  </NavStyles>
)

export default Nav
