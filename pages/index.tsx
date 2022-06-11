import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({data}: any) => {

  const router = useRouter()

  const [searchInputHome, setSearchInputHome] = useState('')

  useEffect(() => {
    console.log(searchInputHome)
  })

  const handleSearchInputHome = (e: any) => {
    const text = e.target.value
    setSearchInputHome(text)
  }

  const handleClickSearchBtn = async () => {
    await fetch('/jobs', {
      method: 'POST',
      body: searchInputHome
    })

    router.push({
      pathname: '/jobs',
      query: {
        keyword: searchInputHome
      }
    })
  }

  return (
    <div>
      <input type='text' value={searchInputHome} onChange={(e) => handleSearchInputHome(e)}></input>
      <button onClick={handleClickSearchBtn}>Buscar</button>
    </div>
  )
}

export default Home
