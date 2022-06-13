import type { NextPage } from 'next'
import Layout from '../layouts/Layout'
import TenCardsGroup from '../components/cards/TenCardsGroup'
import SearchBar from '../components/search/SearchBar'

const Home: NextPage = ({ data }: any): JSX.Element => {

  return (
    <Layout>
      <>
        <SearchBar />
        <TenCardsGroup cardsData={data} />
      </>
    </Layout>
  )
}



export async function getServerSideProps() {
  const res = await fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(res => res.users)
    .catch((error) => console.log(`[API GET ERROR]: ${error}`))

  const data = res

  return {
    props: {
      data: data
    }, // will be passed to the page component as props
  }
}

export default Home
