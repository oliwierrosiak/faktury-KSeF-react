import { useContext, useState } from 'react'
import ArrowIcon from '../../../assets/svg/arrowIcon'
import DownloadIcon from '../../../assets/svg/downloadIcon'
import PDFIcon from '../../../assets/svg/pdfIcon'
import styles from './aside.module.css'
import Calender from './calender/calender'
import Search from './search/search'
import InvoiceSelectedContext from '../../../context/InvoiceSelectedContext'
import HomeLoadingContext from '../../../context/homeLoadingContext'
import LoadingIcon from '../../../assets/svg/loadingIcon'
import axios from 'axios'
import ApiAddress from '../../../ApiAddress'
import MessageContext from '../../../context/messageContext'
import DownloadNeInvoicesContext from '../../../context/donwloadNewInvoicesContext'
import DownloadLoadingContext from '../../../context/downloadLoadingContext'

function Aside(props)
{
    const invoiceSelectedContext = useContext(InvoiceSelectedContext)
    const loadingContext = useContext(HomeLoadingContext)
    const messageContext = useContext(MessageContext)
    const newInvoicesContext = useContext(DownloadNeInvoicesContext)

    const [getLoading,setGetLoading] = useState(false)
    
    const downloadLoadingContext = useContext(DownloadLoadingContext)

    const getInvoices = async()=>
    {
        loadingContext.setLoading(true)
        setGetLoading(true)
        if(getLoading && loadingContext.loading) return
    
        try
        {
            await axios.get(`${ApiAddress}/downloadInvoices`)
            newInvoicesContext.setNewInvoices(true)
            setGetLoading(false)
        }
        catch(ex)
        {
            if(ex.status === 429 && ex.response?.data?.message)
            {
                if(Array.isArray(ex.response.data.message))
                {
                   messageContext.setMessage(ex.response.data.message[0])
                }
                else
                {
                    messageContext.setMessage('Za dużo żądań pobrania faktur')
                }
            }
            else
            {
                messageContext.setMessage('Nie udało sie pobrać faktur')
            }
            setGetLoading(false)
            loadingContext.setLoading(false)
        }
    }

    const sendInvoices = async()=>
    {
        try
        {
            if(!invoiceSelectedContext.invoiceSelected || downloadLoadingContext.downloadLoading)
            {
                return
            }
            console.log(invoiceSelectedContext.invoiceSelected)
            downloadLoadingContext.setDownloadLoading(true)
            const response = await axios.post(`${ApiAddress}/generatePdf`)
            console.log(response)
        }
        catch(ex)
        {
            console.log(ex)
        }
    }

    return(
        <aside className={`${styles.aside} ${!props.showAside?styles.hideAside:''}`}>
            <div className={styles.arrow} onClick={e=>props.setShowAside(!props.showAside)}>
                <ArrowIcon class={`${styles.arrowIcon} ${!props.showAside?styles.arrowRotated:''}`}/>
            </div>

            <section className={styles.searchSection}>
                <Search />
            </section>

            <div className={styles.line}></div>

            <section className={styles.calenderSection}>
                <Calender />
            </section>

            <div className={styles.line}></div>

            <section className={styles.btnSection}>
                <button className={`${styles.btn} ${styles.download} ${getLoading?styles.btnLoading:''}`} onClick={getInvoices}>
                    {getLoading?<div className={styles.btnLoadingContainer}><LoadingIcon /></div>
                    :<>
                    <DownloadIcon class={styles.btnSVG}/>
                    Pobierz Faktury
                    </>}
                    </button>
                <button className={`${styles.btn} ${styles.generate} ${invoiceSelectedContext.invoiceSelected.length && !getLoading && !downloadLoadingContext.downloadLoading?'':styles.noneInvoiceSelected}`} onClick={sendInvoices}>
                    {downloadLoadingContext.downloadLoading?<div className={styles.btnLoadingContainer}><LoadingIcon /></div>:<>
                        <PDFIcon class={styles.btnSVG}/>
                        Generuj PDF
                    </>}
                </button>
            </section>

            


        </aside>
    )
}

export default Aside