import { useContext, useEffect, useRef, useState } from 'react'
import styles from './invoicesContainer.module.css'
import axios from 'axios'
import ApiAddress from '../../../ApiAddress'
import InvoicesNotFound from '../../../assets/svg/invoicesNotFoundIcon'
import ConnectionErrorIcon from '../../../assets/svg/connectionErrorIcon'
import InvoiceElement from './invoiceElement/invoiceElement'
import LoadingIcon from '../../../assets/svg/loadingIcon'
import SomeInvoiceSelectedContext from '../../../context/someInvoiceSelectedContext'
import SelectedDateContext from '../../../context/selectedDateContext'

function InvoicesContainer(props)
{
    const [loading,setLoading] = useState(1)
    const [data,setData] = useState([])
    const [error,setError] = useState({type:null,info:''})
    const [allItemsSelected,setAllItemsSelected] = useState(false)
    const [invoicesMaxLength,setInvoicesMaxLength] = useState(1)
    const [displayPaginationState,setDisplayPaginationState] = useState(true)
    const dateFilter = useRef('all')
    const displayPagination = useRef(true)
    const pagination = useRef(0)
    const blockRepeatPagination = useRef(false)

    const someInvoiceSelectedContext = useContext(SomeInvoiceSelectedContext)
    const dateContext = useContext(SelectedDateContext)

    const listRef = useRef()
    const scrollPagination = useRef()

    const getAllInvoices = async() =>
    {
        try
        {
            if(invoicesMaxLength === data.length)
            {
                return
            }
            console.log(dateFilter)
            const response = await axios.get(`${ApiAddress}/getAllInvoices?skip=${pagination.current}&&date=${dateFilter.current}`)
            setData(prev=>[...prev,...response.data.invoices])
            if(response.data.maxLength)
            {
                setInvoicesMaxLength(response.data.maxLength)
            }
            blockRepeatPagination.current = false
            setLoading(false)
        }
        catch(ex)
        {
            setLoading(false)
            if(ex.status === 404)
            {
                setError({type:404,info:'Nie znaleziono faktur'})
            }
            else
            {
                setError({type:"Connection",info:"Brak połączenia z serwerem"})
            }
        }
    }

    useEffect(()=>{
            setData(prev=>[])
            setLoading(true)
            pagination.current = 0
            displayPagination.current = true
            blockRepeatPagination.current = true
            if(dateContext.date.month !== null && dateContext.date.year)
            {
                dateFilter.current= `${dateContext.date.year}-${dateContext.date.month+1}-01`

            }
            else
            {
                dateFilter.current = 'all'
            }
    },[dateContext.date])

    useEffect(()=>{
        getAllInvoices()
    },[dateFilter.current])


    const changeSelection = (el) =>
    {
        const localState = [...data]

        if(el === "all")
        {
            localState.map(x=>x.select = !allItemsSelected)
        }
        else
        {
            const idx = localState.findIndex(x=>x._id === el)
            localState[idx].select = !localState[idx].select
        }
        setData(localState)
    }

    const sendInvoiceState = async(id,action) =>
    {
        try
        {
            const response = await axios.post(`${ApiAddress}/invoiceActionUpdate`,{
                id,
                action
            })
        }
        catch(ex)
        {
        }
    }

    const changeInvoiceAction = (el,action) =>
    {   
        const localState = [...data]
        const idx = localState.findIndex(x=>x._id === el)
        localState[idx].action = action
        setData(localState)
        sendInvoiceState(el,action)
    }

    useEffect(()=>{

        if(data.length === invoicesMaxLength)
        {
            displayPagination.current = false
            setDisplayPaginationState(false)
        }

        if(!data.length)
        {
            setAllItemsSelected(false)
            return
        }
        let someInvoiceSelected = false
        let allSelected = true
        data.forEach(x=>{
            if(!x.select)
            {
                allSelected = false
            }else
            {
                someInvoiceSelected = true
            }
        })
        someInvoiceSelectedContext.setSomeInvoiceSelected(someInvoiceSelected)
        setAllItemsSelected(allSelected)

    },[data])

    const checkPagination = () =>
    {
        if(displayPagination.current && listRef.current.scrollTop+listRef.current.clientHeight >= listRef.current.scrollHeight-listRef.current.clientHeight * 0.05)
        {
            if(!blockRepeatPagination.current)
            {
                pagination.current = pagination.current+1
                blockRepeatPagination.current = true
                getAllInvoices()
            }
        }
    }

    useEffect(()=>{
        if(!loading && !error.type)
        {
            listRef.current.addEventListener('scroll',checkPagination)
        }
    },[loading])

    useEffect(()=>{
        if(!loading && data.length)
        {
            if(listRef.current.scrollHeight <= listRef.current.clientHeight)
            {
                pagination.current +=1
                getAllInvoices()
            }
        }
    },[loading,data])

    return(
        <div className={styles.container}>

            {loading?
            <div className={styles.loadingContainer}>
                <div className={styles.loading}>
                    <LoadingIcon />
                </div>
            </div>
            :
            <>
                {!error.type && <div className={styles.topMenu}>
                    <div className={styles.topBarElement}>Numer Faktury</div>
                    <div className={styles.topBarElement}>Data Wystawienia</div>
                    <div className={styles.topBarElement}>Kwota Brutto</div>
                    <button className={styles.checkAll} onClick={e=>changeSelection('all')}>{allItemsSelected?`Odznacz Wszystkie (${data.length})`:`Zaznacz Wszystkie (${data.length})`}</button>
                </div>}

                {error.type ?
                <div className={styles.errorContainer}>
                    {error.type === 404?
                    <InvoicesNotFound class={styles.notFoundSVG}/>
                    :
                    <ConnectionErrorIcon class={styles.errorSVG}/>
                    }
                    <h2>{error.info}</h2>    
                </div>
                :
                <ul ref={listRef} className={styles.invoicesList}>
                    {data.map(x=><InvoiceElement key={x._id} changeSelection={changeSelection} changeInvoiceAction={changeInvoiceAction} {...x}/>)}
                    {displayPaginationState&&<li ref={scrollPagination} className={styles.scrollLoading}>
                        <LoadingIcon />
                    </li>}
                </ul>
                }
            </>}
        </div>
    )
}

export default InvoicesContainer