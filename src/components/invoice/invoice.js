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
import TriangleIcon from '../../assets/svg/triangle'
import InvoiceCalender from './invoiceCalender.js/invoiceCalender'

function Invoice()
{

    const [loading,setLoading] = useState(true)
    const [invoiceError,setInvoiceError] = useState({info:'',details:'',exist:false})
    const [invoiceData,setInvoiceData] = useState({})
    const [textAreaValue,setTextAreaValue] = useState('')
    const [displayActionMenu,setDisplayActionMenu] = useState(false)
    const [displayFullActionList,setDisplayFullActionList] = useState(false)


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
        if(el.target.closest(`.${styles.actionTableHeaderItem}`) === null)
        {
            setDisplayFullActionList(false)
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
            messageContext.setMessage("Nie udało się zmienić akcji faktury")
        }
    }

    const changePositionAction = async(action) =>
    {
        try
        {
            const newFields = [...invoiceData.invoiceFields]
            for(const item of newFields)
            {
                item.action = action
                await axios.put(`${ApiAddress}/updateInvoicePositionAction`,{
                invoiceId:params.id,
                positionId:item._id,
                action
                })
            }
            setInvoiceData(prev=>{
                const data = {...prev}
                data.invoiceFields = newFields
                return data
            })
        }
        catch(ex)
        {
            messageContext.setMessage("Nie udało się zmienić akcji pozycji")
        }
    }

    const positionActionChanged = (id,action) =>
    {
        setInvoiceData(prev=>{
            const data = {...prev}
            const item = data.invoiceFields.findIndex(x=>x._id === id)
            data.invoiceFields[item].action = action
            return data
        })
    }

    const changeDisplayingList = () =>
    {
        if(invoiceData.action != 'notRecord' && invoiceData.action != 'cost')
        {
            setDisplayFullActionList(prev=>!prev)
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
                    <div className={styles.tableHeaderItem}>lp.</div>
                    <div className={styles.tableHeaderItem}>Nazwa</div>
                    <div className={styles.tableHeaderItem}>Wartość Brutto</div>

                    <div className={`${styles.tableHeaderItem} ${styles.actionTableHeaderItem} ${invoiceData.action === 'cost' || invoiceData.action === 'notRecord'?styles.cursorDefault:''}`} onClick={changeDisplayingList}>
                        Akcja
                        {invoiceData.action != 'notRecord' && invoiceData.action != 'cost'  && <TriangleIcon class={styles.dropdownMenuIcon}/>}

                        {displayFullActionList && <ul className={styles.list}>
                        <li onClick={e=>changePositionAction(null)}>--Wybierz Akcję--</li>
                        <li onClick={e=>changePositionAction('notRecord')}>Nie Księgować</li>
                        <li onClick={e=>changePositionAction('cost')}>Koszt</li>
                        <li onClick={e=>changePositionAction("goods")}>Towar Handlowy</li>
                        </ul>}
                        
                    </div>

                    <div className={styles.tableHeaderItem}>
                        Komentarz
                    </div>

                    {invoiceData.invoiceFields.map((x,idx)=><InvoicePosition index={idx} key={Math.floor(Math.random()*100000)} getInvoiceData={getInvoiceData} setLoading={setLoading} currency={invoiceData.currency} invoiceAction={invoiceData.action} positionActionChanged={positionActionChanged} {...x}/>)}

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

            

            <article className={styles.payment}>
                    <h2>Płatność</h2>
                    <div className={styles.paymentLine}></div>
                    <p>Metoda Płatności: {invoiceData.paymentMethod}</p>
                    <p>{invoiceData.paymentDate}</p>
            </article>

            <article className={styles.commentsAndCalenderArticle}>

                <InvoiceCalender date={invoiceData.dateOfPayment}/>

                <section className={styles.commentsSection}>
                    <h2 className={styles.commentsHeader}>Uwagi</h2>
                    <textarea className={styles.textArea} placeholder='Wprowadź uwagi dla tej faktury...' value={textAreaValue} onChange={e=>setTextAreaValue(e.target.value)} onBlur={saveComments}></textarea>
                </section>
            </article>
                </>}
            </main>

            {messageContext.message && <Message />}

        </div>
    )
}

export default Invoice