import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({data}: any) => {

  const [users, setUsers] = useState(data)

  useEffect(() => {
    console.log(users)
  })

  return (
    <div>

    </div>
  )
}

export default Home
