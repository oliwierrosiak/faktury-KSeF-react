import styles from './search.module.css'
import SearchIcon from '../../../../assets/svg/searchIcon'
import { useEffect, useState, useRef } from 'react'
import CancelIcon from '../../../../assets/svg/cancelIcon'
import axios from 'axios'
import ApiAddress from '../../../../ApiAddress'
import PropositionsItem from './propositions/propositionsItem'
import InvoicesNotFound from '../../../../assets/svg/invoicesNotFoundIcon'

function Search(props)
{
    const [searchValue,setSearchValue] = useState('')
    const [propositions,setPropositions] = useState([])
    const [propositionsError,setPropositionsError] = useState(false)
    const [displayProposition,setDisplayProposition] = useState(false)

    const inputRef = useRef()

    const searchClicked = (e)=>
    {
        if(e.target.closest('button')) return

        inputRef.current.focus()
    }

    const inputFocus = (e) =>
    {
        e.target.placeholder = ``
        if(propositions.length != 0 || propositionsError)
        {
            setDisplayProposition(true)
        }
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
            setPropositionsError(false)
            setDisplayProposition(true)
        }
        catch(ex)
        {
            setPropositions([])
            setDisplayProposition(true)
            setPropositionsError(true)
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
            setPropositionsError(false)
            setDisplayProposition(false)
        }
    },[searchValue])

    const windowClick = (e) =>
    {
        if(!e.target.closest('search'))
        {
            setDisplayProposition(false)
        }
    }

    useEffect(()=>{
        window.addEventListener('click',windowClick)
        return()=>
        {
            window.removeEventListener('click',windowClick)
        }
    },[])

    return(
        <search className={styles.search} onClick={searchClicked}>

            <SearchIcon class={styles.searchSVG} />

            <input onFocus={inputFocus} onBlur={inputBlur} ref={inputRef} value={searchValue} onChange={e=>setSearchValue(e.target.value)} className={styles.input} placeholder='Wyszukaj Fakturę...'></input>

            <button className={`${styles.clearSearch} ${searchValue!==''?styles.showClearSearch:''}`} onClick={e=>setSearchValue('')}>
                <CancelIcon class={styles.cancelIconSVG}/>
            </button>

            <ul className={`${styles.propositions} ${displayProposition?styles.displayProposition:''}`}>
                {propositions.map(x=><PropositionsItem key={x._id} id={x._id} {...x}/>)}
                {propositionsError && <li className={styles.propositionError}>
                    <InvoicesNotFound class={styles.invoicesNotFound} />
                    <h2>Nie znaleziono wyników</h2>
                    </li>}    
            </ul>

        </search>
    )
}

export default Search