import { useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Layout from '../../layouts/Layout'
import Card from '../../components/cards/Card'
import styles from '../../styles/Search.module.css'
import { text } from 'stream/consumers'


const Index: NextPage = ({data}: any): JSX.Element => {

  const router = useRouter()
  const { lookFor }: any = router?.query

  const [allUsers, setAllUsers] = useState<any>(data)
  const [users, setUsers] = useState<any>(allUsers)
  const [searchInput, setSearchInput] = useState(lookFor || '')

  const handleSearchInput = (e: any): void => {
    const valueInput: string = e.target.value
    setSearchInput(valueInput)
  }
  
  useLayoutEffect((): void => {
    const filterResults = (text: string, allUsers: any) => {
        if (text) {
          const filteredUsers = allUsers.filter((user: any) => {
            if (
              user.firstName.toLowerCase().includes(text?.toLowerCase())
              || user.lastName.toLowerCase().includes(text?.toLowerCase())
      
              ) {return user}
          })
          
          setUsers(filteredUsers)
        } else {
          setUsers(allUsers)
        }
      }

      filterResults(searchInput, allUsers)

  }, [allUsers, setUsers, searchInput, lookFor]) // DEPENDENCIES ADDED || if it isn't added: [WARNING]: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.

  return (
    <Layout>
      <>
      <input style={{ marginBottom: '20px' }} placeholder="Type a name or lastname..." className={ styles.inputSearch } type="text" value={searchInput} onChange={(e) => handleSearchInput(e)} />
      <div className={ styles.cardGrid }>
        { users.map((job: any, key: number) => (
          <Card
            key={key}
            id={ job.id }
            firstName={ job.firstName }
            lastName={ job.lastName }
            age={ job.age }
            email={ job.email }
            birthDate={ job.birthDate }
          />
        )) }
      </div>
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

export default Index