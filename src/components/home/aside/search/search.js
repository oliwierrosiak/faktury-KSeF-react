import styles from './search.module.css'
import SearchIcon from '../../../../assets/svg/searchIcon'
import { useEffect, useState, useRef } from 'react'
import CancelIcon from '../../../../assets/svg/cancelIcon'
import axios from 'axios'
import ApiAddress from '../../../../ApiAddress'
import PropositionsItem from './propositions/propositionsItem'

function Search(props)
{
    const [searchValue,setSearchValue] = useState('')
    const [propositions,setPropositions] = useState([])
    const [propositionsError,setPropositionsError] = useState(false)

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

    const sendSearchQuery = async()=>
    {
        try
        {
            const response = await axios.get(`${ApiAddress}/search?query=${searchValue}`)
            setPropositions(response.data)
            console.log(response.data)
        }
        catch(ex)
        {

        }
    }

    useEffect(()=>{
        if(searchValue !== '')
        {
            sendSearchQuery()

        }
        else
        {
            setPropositions([])
        }
    },[searchValue])

    return(
        <search className={styles.search} onClick={searchClicked}>

            <SearchIcon class={styles.searchSVG} />

            <input onFocus={inputFocus} onBlur={inputBlur} ref={inputRef} value={searchValue} onChange={e=>setSearchValue(e.target.value)} className={styles.input} placeholder='Wyszukaj Fakturę...'></input>

            <button className={`${styles.clearSearch} ${searchValue!==''?styles.showClearSearch:''}`} onClick={e=>setSearchValue('')}>
                <CancelIcon class={styles.cancelIconSVG}/>
            </button>

            <ul className={`${styles.propositions} ${propositions.length != 0?styles.displayProposition:''}`}>
                {propositions.map(x=><PropositionsItem key={x._id} {...x.Fa}/>)}    
            </ul>

        </search>
    )
}

export default Search