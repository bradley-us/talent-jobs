import { useEffect, useState } from 'react'
import type { NextPage } from 'next'

const Index: NextPage = ({data}: any) => {
  const [allUsers, setAllUsers] = useState(data)
  const [users, setUsers] = useState(allUsers)
  const [searchInput, setSearchInput] = useState('')

  const handleSearchInput = (e: any) => {
    const valueInput = e.target.value
    setSearchInput(valueInput)
  }

  useEffect(() => {
    const filterResults = (text: any) => {
      var filteredUsers = allUsers.filter((user: any) => {
        if (
          user.firstName.toLowerCase().includes(text.toLowerCase())
          || user.lastName.toLowerCase().includes(text.toLowerCase())
  
          ) return user
      })
  
      setUsers(filteredUsers)
    }

    filterResults(searchInput)
  }, [allUsers, searchInput]) // DEPENDENCIES ADDED || if it isn't added: [WARNING]: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.

  return (
    <div>
      <input type="text" value={searchInput} onChange={(e) => handleSearchInput(e)} />
      { users.map((user: any) => (
        <p key={user.id}>{ user.firstName } - { user.lastName } - { user.age } - { user.birthDate } - { user.company.name } - { user.company.title } </p>
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