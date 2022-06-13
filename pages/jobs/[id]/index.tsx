import { NextPage } from "next"
import Card from "../../../components/cards/Card"
import Layout from "../../../layouts/Layout"

const JobPost: NextPage = ({ job }: any) => {
  console.log(job)
  return (
    <Layout>
      <>
        <h2>Datos del contacto elegido</h2>
        <Card
          infoPage={true}
          id={ job.id }
          firstName={ job.firstName }
          lastName={ job.lastName }
          age={ job.age }
          email={ job.email }
          birthDate={ job.birthDate }
        />
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