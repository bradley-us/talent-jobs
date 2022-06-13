import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Link from 'next/link'

const Index: NextPage = ({data}: any): JSX.Element => {

  const router = useRouter()
  const { lookFor }: any = router.query

  const [allUsers, setAllUsers] = useState<any>(data)
  const [users, setUsers] = useState<any>(allUsers)
  const [searchInput, setSearchInput] = useState<string | undefined>(lookFor)

  const handleSearchInput = (e: any): void => {
    const valueInput: string = e.target.value
    setSearchInput(valueInput)
  }

  useEffect((): void => {
    const filterResults = (text: string | undefined) => {
      var filteredUsers = allUsers.filter((user: any) => {
        if (
          user.firstName.toLowerCase().includes(text?.toLowerCase())
          || user.lastName.toLowerCase().includes(text?.toLowerCase())
  
          ) return user
      })
  
      setUsers(filteredUsers)
    }

    filterResults(searchInput)
  }, [allUsers, setUsers, searchInput, lookFor]) // DEPENDENCIES ADDED || if it isn't added: [WARNING]: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.

  return (
    <div>
      <input type="text" value={searchInput} onChange={(e) => handleSearchInput(e)} />
      { users.map((user: any) => (
        <div key={user.id}>
          <p>{ user.firstName } - { user.lastName } - { user.age } - { user.birthDate } - { user.company.name } - { user.company.title } </p>
          <Link href={`/jobs/${user.id}`}><a>Go to Post page {user.id}</a></Link>
        </div>
      )) }
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

export default Index