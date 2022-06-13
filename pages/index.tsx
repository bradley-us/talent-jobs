import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Layout from '../layouts/Layout'
import Card from '../components/cards/Card'

const Home: NextPage = ({ data }: any): JSX.Element => {

  const [jobs, setJobs] = useState<any>(data)

  const sortedJobs: any = jobs.slice().sort((a: any, b: any): any => {
    const AA: number = new Date(a.birthDate.slice(5)).getTime()
    const BB: number = new Date(b.birthDate.slice(5)).getTime()
    return AA - BB
  })

  const t: Date = new Date();
  const date: string = ('0' + t.getDate()).slice(-2);
  const month: string = ('0' + (t.getMonth() + 1)).slice(-2);
  const year: number = t.getFullYear();
  const fullDate: string = `${year}-${month}-${date}`;
  
  const filteredJobsByDate: any = sortedJobs.filter((job: any) => {
    const jobDateStr: string = job.birthDate.slice(5).replace(/-/g, '')
    const todayDateStr: string = fullDate.slice(5).replace(/-/g, '')
    const jobDateNum: number = Number(jobDateStr)
    const todayDateNum: number = Number(todayDateStr)
    if (jobDateNum > todayDateNum)
    return job
  })

  const [jobList, setJobList] = useState<any>(filteredJobsByDate)

  const insertNextYear = (): void => {
    for (const job of sortedJobs) {
      setJobList((prevState: any) => [...prevState, job])
    } 
  }

  const runFunction = (): void => {
    if (jobList.length < 10)
    insertNextYear()
  }
  runFunction()

  const router: any = useRouter()
  const [searchInputHome, setSearchInputHome] = useState<string>('')

  const handleSearchInputHome = (e: any): void => {
    const text: string = e.target.value
    setSearchInputHome(text)
    if (e.key === 'Enter') {
      handleClickSearchBtn()
    }
  }

  const handleClickSearchBtn = async (): Promise<any> => {
    await fetch('/jobs', {
      method: 'POST',
      body: searchInputHome
    })

    router.push({
      pathname: '/jobs',
      query: {
        lookFor: searchInputHome
      }
    })
  }

  return (
    <Layout>
      <>
        <Card data={jobList} />
        <input type='text' value={searchInputHome} onChange={(e) => handleSearchInputHome(e)} onKeyDown={(e) => e.key === 'Enter' ? handleClickSearchBtn() : null}></input>
        <button onClick={handleClickSearchBtn}>Buscar</button>
        { jobList.map((job:any, key:number) => {
          if (key < 10) return (
            <p key={key}>{ job.birthDate }</p>
          )
        })}
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
