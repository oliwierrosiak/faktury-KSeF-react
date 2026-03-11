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
            console.log(response.data)
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

    const transformInvoiceAction = (value)=>
    {
        switch(value)
        {
            case 'notRecord':
                return 'Nie Księgować'
            case 'cost':
                return 'Koszt'
            default:
                return ''
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
                <h2>Nie udało się pobrać danych faktury</h2>
            </div>}

            {!loading && !invoiceError &&<>
            
                <header className={styles.header}>
                    <section className={styles.invoiceInfo}>
                        <h1 className={invoiceData.action === 'notRecord'?styles.h1Overline:''}>Faktura nr: {invoiceData.invoiceNumber}</h1>
                        <p>Numer KSeF: {invoiceData.ksefNumber}</p>
                        <p>Data wystawienia: {invoiceData.issueDate}</p>
                        <p>Rodzaj faktury: {invoiceData.invoiceType}</p>
                    </section>
                    <section className={styles.invoiceAction}>
                        <h2>{transformInvoiceAction(invoiceData.action)}</h2>
                    </section>
                </header>

                <article className={styles.buyerSellerInfo}>
                    <section className={styles.section}>
                        <h2>Sprzedawca</h2>
                        <div className={styles.line}></div>
                        <p className={styles.sectionItem}>Nazwa: {invoiceData.seller?.name}</p>
                        <p className={styles.sectionItem}>NIP: {invoiceData.seller?.nip}</p>
                    </section>

                    <section className={styles.section}>
                        <h2>Nabywca</h2>
                        <div className={styles.line}></div>
                        <p className={styles.sectionItem}>Nazwa: {invoiceData.buyer?.name}</p>
                        <p className={styles.sectionItem}>NIP: {invoiceData.buyer?.nip}</p>
                    </section>
                </article>

                <article className={styles.table}>
                    
                </article>

            </>}

            </main>
        </div>
    )
}

export default Invoice