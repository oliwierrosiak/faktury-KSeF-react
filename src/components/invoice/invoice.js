import { useEffect, useState } from 'react'
import styles from './invoice.module.css'
import LoadingIcon from '../../assets/svg/loadingIcon'
import InvoicesNotFound from '../../assets/svg/invoicesNotFoundIcon'
import ArrowIcon from '../../assets/svg/arrowIcon'
import { useNavigate, useParams } from 'react-router-dom'
import ApiAddress from '../../ApiAddress'
import axios from 'axios'
import InvoicePosition from './invoicePosition'

function Invoice()
{

    const [loading,setLoading] = useState(true)
    const [invoiceError,setInvoiceError] = useState(false)
    const [invoiceData,setInvoiceData] = useState({})

    const navigate = useNavigate()
    const params = useParams()

    const positionsConfig = [
    {
        name: 'Usługa programistyczna - Backend API',
        netto: 15000.00,
        brutto: 18450.00,
        vat: "23%"
    },
    {
        name: 'Konsultacje IT (godzinowe)',
        netto: 2500.00,
        brutto: 3075.00,
        vat: "23%"
    },
    {
        name: 'Laptop Dell XPS 15',
        netto: 8200.00,
        brutto: 10086.00,
        vat: "23%"
    },
    {
        name: 'Licencja oprogramowania (roczna)',
        netto: 600.00,
        brutto: 738.00,
        vat: "23%"
    },
    {
        name: 'Usługi doradcze (stawka obniżona)',
        netto: 1000.00,
        brutto: 1080.00,
        vat: "8%"
    },
    ]

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
                    <div className={styles.tableHeaderItem}>Nazwa</div>
                    <div className={styles.tableHeaderItem}>Wartość Brutto</div>

                    <div className={styles.tableHeaderItem}>
                        Akcja
                    </div>

                    <div className={styles.tableHeaderItem}>
                        Komentarz
                    </div>

                    {positionsConfig.map(x=><InvoicePosition key={Math.floor(Math.random()*100000)} {...x}/>)}

                </article>

                <article className={styles.sum}>
                    <div className={styles.sumTable}>
                    <div></div>
                    <div className={`${styles.sumTableHeader} ${styles.tableBorderLeft} ${styles.tableBorderTop}`}>Wartość Netto</div>
                    <div className={`${styles.sumTableHeader} ${styles.tableBorderTop}`}>VAT</div>
                    <div className={`${styles.sumTableHeader} ${styles.tableBorderTop} ${styles.tableBorderRight}`}>Wartość Brutto</div>
                    <div className={`${styles.sumTableHeader} ${styles.tableBorderTop} ${styles.tableBorderLeft} ${styles.tableBorderBottom}`}>Razem</div>
                    <div className={`${styles.sumTableItem} ${styles.tableBorderBottom}`}>{invoiceData.netAmount} PLN</div>
                    <div className={`${styles.sumTableItem} ${styles.tableBorderBottom}`}>{invoiceData.vatAmount} PLN</div>
                    <div className={`${styles.sumTableItem} ${styles.tableBorderBottom} ${styles.tableBorderRight} ${styles.bold}`}>{invoiceData.grossAmount} PLN</div>
                    </div>
                </article>

            </>}

            </main>
        </div>
    )
}

export default Invoice