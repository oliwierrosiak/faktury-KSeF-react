import { useContext, useEffect, useState } from 'react'
import styles from './invoice.module.css'
import LoadingIcon from '../../assets/svg/loadingIcon'
import InvoicesNotFound from '../../assets/svg/invoicesNotFoundIcon'
import ArrowIcon from '../../assets/svg/arrowIcon'
import { useNavigate, useParams } from 'react-router-dom'
import ApiAddress from '../../ApiAddress'
import axios from 'axios'
import InvoicePosition from './invoicePosition'
import MessageContext from '../../context/messageContext'
import Message from '../message/message'

function Invoice()
{

    const [loading,setLoading] = useState(true)
    const [invoiceError,setInvoiceError] = useState({info:'',details:'',exist:false})
    const [invoiceData,setInvoiceData] = useState({})
    const [textAreaValue,setTextAreaValue] = useState('')
    const [displayActionMenu,setDisplayActionMenu] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    const messageContext = useContext(MessageContext)

    const getInvoiceData = async()=>{
        try
        {
            const response = await axios.get(`${ApiAddress}/getInvoiceData?id=${params.id}`)
            setInvoiceData(response.data)
            setTextAreaValue(response.data.comments?response.data.comments:'')
            setLoading(false)
        }
        catch(ex)
        {
            if(ex.status == 429 && ex.response?.data?.details)
            {
                console.log(ex.response.data)
                setInvoiceError({
                    info:`Nie udało się pobrać danych pozycji faktury.`,
                    details: `${ex.response.data.details}`,
                    exist:true,
                })
            }
            else
            {
                setInvoiceError({
                    info:'Nie udało się pobrać danych faktury',
                    details:'',
                    exist:true,
                })
            }
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

    const windowClick = (el) =>
    {
        if(el.target.closest(`.${styles.changeAction}`) === null)
        {
            setDisplayActionMenu(false)
        }
    }

    useEffect(()=>{
        window.addEventListener("click",windowClick)
        getInvoiceData()
        return()=>
        {
            window.removeEventListener("click",windowClick)
        }
    },[])

    const saveComments = async() =>
    {
        try
        {
            await axios.post(`${ApiAddress}/updateInvoiceComments`,{
                id:invoiceData._id,
                comments:textAreaValue
            })
        }
        catch(ex)
        {
            console.log(ex)
            messageContext.setMessage("Nie udało się zapisać uwag do faktury")
        }
    }

    const changeAction = async(val) =>
    {
        try
        {
            await axios.put(`${ApiAddress}/invoiceActionUpdate`,{
                id:params.id,
                action:val
            })
            setLoading(true)
            getInvoiceData()
        }
        catch(ex)
        {
            console.log(ex)
            messageContext.setMessage("Nie udało się zmienić akcji faktury")
        }
    }

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

            {invoiceError.exist &&<div className={styles.errorContainer}>
                <InvoicesNotFound class={styles.invoiceError}/>
                <h2>{invoiceError.info}</h2>
                {invoiceError.details && <h3>
                    <mark className={styles.markError}>Błąd KSeF: </mark>
                    {invoiceError.details}
                    </h3>}
            </div>}

            {!loading && !invoiceError.exist &&<>
            
                <header className={styles.header}>
                    <h1 className={invoiceData.action === 'notRecord'?styles.h1Overline:''}>Faktura nr: {invoiceData.invoiceNumber}</h1>
                    <p>Numer KSeF: {invoiceData.ksefNumber}</p>
                    <p>Data wystawienia: {invoiceData.issueDate}</p>
                    <p>Rodzaj faktury: {invoiceData.invoiceType}</p>

                    <div className={styles.invoiceAction}>
                        <h2>{transformInvoiceAction(invoiceData.action)}</h2>
                        <div className={styles.changeAction} onClick={e=>setDisplayActionMenu(!displayActionMenu)}>
                            <h3>Zmień akcję</h3>
                            {displayActionMenu && <ul className={styles.actionList}>
                                <li onClick={e=>changeAction('')}>Brak</li>
                                <li onClick={e=>changeAction('notRecord')}>Nie Księgować</li>
                                <li onClick={e=>changeAction('cost')}>Koszt</li>
                            </ul>}
                        </div>
                    </div>
                </header>

                <article className={styles.buyerSellerInfo}>
                    <section className={styles.section}>
                        <h2>Sprzedawca</h2>
                        <div className={styles.line}></div>
                        <p className={styles.sectionItem}>Nazwa: {invoiceData.seller?.name}</p>
                        {invoiceData.seller?.nip && <p className={styles.sectionItem}>NIP: {invoiceData.seller.nip}</p>}
                    </section>

                    <section className={styles.section}>
                        <h2>Nabywca</h2>
                        <div className={styles.line}></div>
                        <p className={styles.sectionItem}>Nazwa: {invoiceData.buyer?.name}</p>
                        {invoiceData.buyer?.nip && <p className={styles.sectionItem}>NIP: {invoiceData.buyer.nip}</p>}
                        {invoiceData.buyer?.identifier?.type === "Nip" && <p className={styles.sectionItem}>NIP: {invoiceData.buyer.identifier.value}</p>}
                    </section>
                </article>        

                <article className={styles.table}>
                    <div className={`${styles.tableHeaderItem} ${styles.leftTopRadius}`}>Nazwa</div>
                    <div className={styles.tableHeaderItem}>Wartość Brutto</div>

                    <div className={styles.tableHeaderItem}>
                        Akcja
                    </div>

                    <div className={`${styles.tableHeaderItem} ${styles.rightTopRadius}`}>
                        Komentarz
                    </div>

                    {invoiceData.invoiceFields.map(x=><InvoicePosition key={Math.floor(Math.random()*100000)} getInvoiceData={getInvoiceData} setLoading={setLoading} currency={invoiceData.currency} invoiceAction={invoiceData.action} {...x}/>)}

                </article>

                <article className={styles.sum}>
                    <div className={styles.sumTable}>
                    <div></div>
                    <div className={`${styles.sumTableHeader} ${styles.tableBorderLeft} ${styles.tableBorderTop}`}>Wartość Netto</div>
                    <div className={`${styles.sumTableHeader} ${styles.tableBorderTop}`}>VAT</div>
                    <div className={`${styles.sumTableHeader} ${styles.tableBorderTop} ${styles.tableBorderRight}`}>Wartość Brutto</div>
                    <div className={`${styles.sumTableHeader} ${styles.tableBorderTop} ${styles.tableBorderLeft} ${styles.tableBorderBottom}`}>Razem</div>
                    <div className={`${styles.sumTableItem} ${styles.tableBorderBottom}`}>{invoiceData.netAmount.toFixed(2)} {invoiceData.currency}</div>
                    <div className={`${styles.sumTableItem} ${styles.tableBorderBottom}`}>{invoiceData.vatAmount.toFixed(2)} {invoiceData.currency}</div>
                    <div className={`${styles.sumTableItem} ${styles.tableBorderBottom} ${styles.tableBorderRight} ${styles.bold}`}>{invoiceData.grossAmount.toFixed(2)} {invoiceData.currency}</div>
                    </div>
                </article>

            </>}

            <article className={styles.payment}>
                    <h2>Płatność</h2>
                    <div className={styles.paymentLine}></div>
                    <p>Metoda Płatności: {invoiceData.paymentMethod}</p>
                    <p>{invoiceData.paymentDate}</p>
            </article>

            <article className={styles.commentsArticle}>
                <h2 className={styles.commentsHeader}>Uwagi</h2>
                <textarea class={styles.textArea} placeholder='Wprowadź uwagi dla tej faktury...' value={textAreaValue} onChange={e=>setTextAreaValue(e.target.value)} onBlur={saveComments}></textarea>
            </article>

            </main>

            {messageContext.message && <Message />}

        </div>
    )
}

export default Invoice