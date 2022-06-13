import { NextPage } from "next"
import { useRouter } from "next/router"

import styles from '../../../styles/Card.module.css'
import Card from "../../../components/cards/Card"
import Layout from "../../../layouts/Layout"

const JobPost: NextPage = ({ job }: any) => {

  const router = useRouter()
  
  return (
    <Layout>
      <>
        <h2>Datos del contacto elegido</h2>
        <Card
          infoPage
          id={ job.id }
          firstName={ job.firstName }
          lastName={ job.lastName }
          age={ job.age }
          email={ job.email }
          birthDate={ job.birthDate }
        />
        <span style={{ marginTop: '10px'}} className={ styles.spanMoreInfoBtn } onClick={() => router.back()}>Go back</span>
      </>
    </Layout>
  )
}

export async function getServerSideProps({ params }: any) {
  try {
    const jobId = `${params.id}`
    const fetchJobById = await fetch(`https://dummyjson.com/users/${jobId}`)
    const job = await fetchJobById.json()

    return {
      props: {job}
    }
  } catch (error) {
    console.log(`[ERROR FETCHING DATA FROM API]: ${error}`)
  }
}

export default JobPost