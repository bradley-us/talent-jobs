import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({ data }: any) => {

  const [jobs, setJobs] = useState(data)

  const sortedJobs = jobs.slice().sort((a: any, b: any): any => {
    const AA: any = new Date(a.birthDate.slice(5)).getTime()
    const BB: any = new Date(b.birthDate.slice(5)).getTime()
    return AA - BB
  })

  const t = new Date();
  const date = ('0' + t.getDate()).slice(-2);
  const month = ('0' + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  // const hours = ('0' + t.getHours()).slice(-2);
  // const minutes = ('0' + t.getMinutes()).slice(-2);
  // const seconds = ('0' + t.getSeconds()).slice(-2);
  const fullDate = `${year}-${month}-${date}`;
  // console.log(fullDate, `+`, t, `+`, date, `+`, month)
  
  const filteredJobsByDate = sortedJobs.filter((job: any) => {
    const jobDateStr = job.birthDate.slice(5).replace(/-/g, '')
    const todayDateStr = fullDate.slice(5).replace(/-/g, '')
    const jobDateNum = Number(jobDateStr)
    const todayDateNum = Number(todayDateStr)
    if (jobDateNum > todayDateNum)
    return job
  })

  const [jobList, setJobList] = useState(filteredJobsByDate)

  const insertNextYear = () => {
    for (const job of sortedJobs) {
      setJobList((prevState: any) => [...prevState, job])
    } 
  }

  const runFunction = () => {
    if (jobList.length < 10)
    insertNextYear()
  }
  runFunction()

  const router = useRouter()
  const [searchInputHome, setSearchInputHome] = useState('')

  useEffect(() => {
  })

  const handleSearchInputHome = (e: any) => {
    const text = e.target.value
    setSearchInputHome(text)
    if (e.key === 'Enter') {
      handleClickSearchBtn()
    }
  }

  const handleClickSearchBtn = async () => {
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
    <div>
      <input type='text' value={searchInputHome} onChange={(e) => handleSearchInputHome(e)} onKeyDown={(e) => e.key === 'Enter' ? handleClickSearchBtn() : null}></input>
      <button onClick={handleClickSearchBtn}>Buscar</button>
      { jobList.map((job:any, key:any) => {
        if (key < 10) return (
          <p key={key}>{ job.birthDate }</p>
        )
      })}
    </div>
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
