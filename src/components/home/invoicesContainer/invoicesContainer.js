import { useContext, useEffect, useRef, useState } from 'react'
import styles from './invoicesContainer.module.css'
import axios from 'axios'
import ApiAddress from '../../../ApiAddress'
import InvoicesNotFound from '../../../assets/svg/invoicesNotFoundIcon'
import ConnectionErrorIcon from '../../../assets/svg/connectionErrorIcon'
import InvoiceElement from './invoiceElement/invoiceElement'
import LoadingIcon from '../../../assets/svg/loadingIcon'
import InvoiceSelectedContext from '../../../context/InvoiceSelectedContext'
import SelectedDateContext from '../../../context/selectedDateContext'
import HomeLoadingContext from '../../../context/homeLoadingContext'
import MessageContext from '../../../context/messageContext'
import DownloadNeInvoicesContext from '../../../context/donwloadNewInvoicesContext'

function InvoicesContainer(props)
{
    const dateContext = useContext(SelectedDateContext)

    const dateFilterSetter = () =>
    {
        if(dateContext.date.month !== null && dateContext.date.year)
        {
            return `${dateContext.date.year}-${dateContext.date.month+1}-01`
        }
        else
        {
            return 'all'
        }
    }

    const [data,setData] = useState([])
    const [error,setError] = useState({type:null,info:''})
    const [allItemsSelected,setAllItemsSelected] = useState(false)
    const [dateFilter,setDateFilter] = useState(dateFilterSetter())

    const loadingContext = useContext(HomeLoadingContext)
    const messageContext = useContext(MessageContext)
    const invoiceSelectedContext = useContext(InvoiceSelectedContext)
   
    const newInvoicesContext = useContext(DownloadNeInvoicesContext)

    const listRef = useRef()

    const getInvoices = async() =>
    {
        try
        {
            const response = await axios.get(`${ApiAddress}/getInvoices?date=${dateFilter}`)
            setData(prev=>[...prev,...response.data])
            loadingContext.setLoading(false)
            setError({type:null,info:''})
            const data = response.data
            const selected = invoiceSelectedContext.invoiceSelected
            const newSelected = selected.filter(x=>{
                const exist = data.findIndex(y=>y._id === x)
                if(exist != -1)
                {
                    return x
                }
            })
            invoiceSelectedContext.setInvoiceSelected(newSelected)
        }
        catch(ex)
        {
            loadingContext.setLoading(false)
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
        setData([])
        if(dateContext.date.month !== null && dateContext.date.year)
        {
            setDateFilter(`${dateContext.date.year}-${dateContext.date.month+1}-01`)
        }
        else
        {
            setDateFilter('all')
        }
            
    },[dateContext.date])
    
    useEffect(()=>{
        setTimeout(() => {
            getInvoices()
        }, 50);
    },[dateFilter])

    useEffect(()=>{
        if(newInvoicesContext.newInvoices)
        {
            setData([])
            getInvoices()
            newInvoicesContext.setNewInvoices(false)
        }
    },[newInvoicesContext.newInvoices])

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
            await axios.put(`${ApiAddress}/invoiceActionUpdate`,{
                id,
                action
            })
        }
        catch(ex)
        {
            messageContext.setMessage("Nie udało się zapisać akcji faktury")
            setData([])
            loadingContext.setLoading(true)
            getInvoices()
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

    const selectAll = () =>
    {
        if(invoiceSelectedContext.invoiceSelected.length === data.length)
        {
            invoiceSelectedContext.setInvoiceSelected([])
        }
        else
        {
            const allInvoices = data.map(x=>x._id)
            invoiceSelectedContext.setInvoiceSelected(allInvoices)
        }
    }

    useEffect(()=>{
        if(invoiceSelectedContext.invoiceSelected.length != 0 && invoiceSelectedContext.invoiceSelected.length === data.length)
        {
            setAllItemsSelected(true)
        }
        else
        {
            setAllItemsSelected(false)
        }
    },[invoiceSelectedContext.invoiceSelected,dateFilter])

    return(
        <div className={styles.container}>

            {loadingContext.loading?
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
                    <button className={styles.checkAll} onClick={selectAll}>{allItemsSelected?`Odznacz Wszystkie (${data.length})`:`Zaznacz Wszystkie (${data.length})`}</button>
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
                </ul>
                }
            </>}
        </div>
    )
}

export default InvoicesContainer