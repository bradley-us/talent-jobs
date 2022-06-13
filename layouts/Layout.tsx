import Head from "next/head"
import Footer from "./min_components/Footer"
import Header from "./min_components/Header"

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

      <main>{ children }</main>

      <Footer />
    </>
  )
}

export default Layout