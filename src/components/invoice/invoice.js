import { useEffect, useState } from 'react'
import styles from './invoice.module.css'
import LoadingIcon from '../../assets/svg/loadingIcon'
import InvoicesNotFound from '../../assets/svg/invoicesNotFoundIcon'
import ArrowIcon from '../../assets/svg/arrowIcon'
import { useNavigate, useParams } from 'react-router-dom'
import ApiAddress from '../../ApiAddress'
import axios from 'axios'

function Invoice()
{

    const [loading,setLoading] = useState(true)
    const [invoiceError,setInvoiceError] = useState(false)
    const [invoiceData,setInvoiceData] = useState({})

    const navigate = useNavigate()
    const params = useParams()

    const getInvoiceData = async()=>{
        try
        {
            const response = await axios.get(`${ApiAddress}/getInvoiceData?id=${params.id}`)
            setInvoiceData(response.data)
            setLoading(false)
        }
        catch(ex)
        {
            console.log(ex)
            setInvoiceError(true)
            setLoading(false)
        }
    }

    useEffect(()=>{
        getInvoiceData()
    },[])

    return(
        <div className={styles.container}>
            <main className={styles.main}>

            <div className={styles.back} onClick={e=>navigate('/')}>
                <ArrowIcon class={styles.arrow}/>
            </div>

            {loading && <div className={styles.loadingContainer}>
                <div className={styles.loading}>
                    <LoadingIcon />
                </div>
            </div>}

            {invoiceError &&<div className={styles.errorContainer}>
                <InvoicesNotFound class={styles.invoiceError}/>
                <h1>Nie udało się pobrać danych faktury</h1>
            </div>}

            </main>
        </div>
    )
}

export default Invoice