import { useRouter } from "next/router"
import { useState } from "react"

import styles from '../../styles/Search.module.css'

const SearchBar = () => {

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
    <>
      <input placeholder="Type a name or lastname..." className={ styles.inputSearch } type='text' value={searchInputHome} onChange={(e) => handleSearchInputHome(e)} onKeyDown={(e) => e.key === 'Enter' ? handleClickSearchBtn() : null}></input>
      <button className={ styles.searchBtn } onClick={handleClickSearchBtn}>Buscar</button>
    </>
  )
}

export default SearchBar