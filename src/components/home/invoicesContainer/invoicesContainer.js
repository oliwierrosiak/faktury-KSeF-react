import { useContext, useEffect, useState } from 'react'
import styles from './invoicesContainer.module.css'
import axios from 'axios'
import ApiAddress from '../../../ApiAddress'
import InvoicesNotFound from '../../../assets/svg/invoicesNotFoundIcon'
import ConnectionErrorIcon from '../../../assets/svg/connectionErrorIcon'
import InvoiceElement from './invoiceElement/invoiceElement'
import LoadingIcon from '../../../assets/svg/loadingIcon'
import SomeInvoiceSelectedContext from '../../../context/someInvoiceSelectedContext'

function InvoicesContainer(props)
{
    const [loading,setLoading] = useState(1)
    const [data,setData] = useState([])
    const [error,setError] = useState({type:null,info:''})
    const [allItemsSelected,setAllItemsSelected] = useState(false)

    const someInvoiceSelectedContext = useContext(SomeInvoiceSelectedContext)

    const getAllInvoices = async() =>
    {
        try
        {
            const response = await axios.get(`${ApiAddress}/getAllInvoices`)
            setData(response.data)
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
        getAllInvoices()
    },[])

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
            console.log(response)
        }
        catch(ex)
        {
            console.log(ex)
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
                    <button className={styles.checkAll} onClick={e=>changeSelection('all')}>{allItemsSelected?"Odznacz Wszystkie":"Zaznacz Wszystkie"}</button>
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
                <ul className={styles.invoicesList}>
                    {data.map(x=><InvoiceElement key={x._id} changeSelection={changeSelection} changeInvoiceAction={changeInvoiceAction} {...x}/>)}
                </ul>
                }
            </>}
        </div>
    )
}

export default InvoicesContainer