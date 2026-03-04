import styles from './search.module.css'
import SearchIcon from '../../../../assets/svg/searchIcon'
import { useEffect, useState } from 'react'
import CancelIcon from '../../../../assets/svg/cancelIcon'

function Search(props)
{
    const [searchValue,setSearchValue] = useState('')

    return(
        <search className={styles.search}>

            <SearchIcon class={styles.searchSVG} />

            <input value={searchValue} onChange={e=>setSearchValue(e.target.value)} className={styles.input} placeholder='Wyszukaj Fakturę...'></input>

            <button className={`${styles.clearSearch} ${searchValue!==''?styles.showClearSearch:''}`} onClick={e=>setSearchValue('')}>
                <CancelIcon class={styles.cancelIconSVG}/>
            </button>

        </search>
    )
}

export default Search