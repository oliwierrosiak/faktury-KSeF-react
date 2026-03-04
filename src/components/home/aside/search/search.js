import styles from './search.module.css'
import SearchIcon from '../../../../assets/svg/searchIcon'
import { useEffect, useState, useRef } from 'react'
import CancelIcon from '../../../../assets/svg/cancelIcon'

function Search(props)
{
    const [searchValue,setSearchValue] = useState('')

    const inputRef = useRef()

    const searchClicked = (e)=>
    {
        if(e.target.closest('button')) return

        inputRef.current.focus()
    }

    const inputFocus = (e) =>
    {
        e.target.placeholder = ``
    }

    const inputBlur = (e)=>
    {
        e.target.placeholder = `Wyszukaj Fakturę...`
    }

    return(
        <search className={styles.search} onClick={searchClicked}>

            <SearchIcon class={styles.searchSVG} />

            <input onFocus={inputFocus} onBlur={inputBlur} ref={inputRef} value={searchValue} onChange={e=>setSearchValue(e.target.value)} className={styles.input} placeholder='Wyszukaj Fakturę...'></input>

            <button className={`${styles.clearSearch} ${searchValue!==''?styles.showClearSearch:''}`} onClick={e=>setSearchValue('')}>
                <CancelIcon class={styles.cancelIconSVG}/>
            </button>

        </search>
    )
}

export default Search