import Link from "next/link"
import { useRouter } from "next/router"

import styles from '../../styles/Layout.module.css'

const Header = (): JSX.Element => {

  const router = useRouter()

  return (
    <header className={ styles.headerBody }>
      <nav>
        <ul className={ styles.navBarList }>
          <Link href={'/'}><a style={{ color: `${router.asPath === '/' ? '#00af94' : 'black'}`}}>HOME</a></Link>
          <Link href={'/jobs'} style={{ color: `${router.asPath === '/jobs' ? '#00af94' : 'black'}`}}><a>USERS</a></Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header