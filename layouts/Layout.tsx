import Head from "next/head"
import Footer from "./min_components/Footer"
import Header from "./min_components/Header"

import styles from '../styles/Layout.module.css'

interface PropsLayout {
  title?: string,
  children?: JSX.Element
};

const Layout = ({ title, children }: PropsLayout): JSX.Element => {
  return (
    <>
      <Head>
      <title>{ title }</title>
      </Head>

      <Header />

      <main className={ styles.mainBody }>{ children }</main>

      <Footer />
    </>
  )
}

export default Layout