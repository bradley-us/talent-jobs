const JobPost = ({ job }: any) => {
  console.log(job)
  return (
    <div>Received by params: { job.id } - { job.firstName } - { job.birthDate } </div>
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