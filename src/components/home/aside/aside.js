import { useContext, useState } from 'react'
import ArrowIcon from '../../../assets/svg/arrowIcon'
import DownloadIcon from '../../../assets/svg/downloadIcon'
import PDFIcon from '../../../assets/svg/pdfIcon'
import styles from './aside.module.css'
import Calender from './calender/calender'
import Search from './search/search'
import SomeInvoiceSelectedContext from '../../../context/someInvoiceSelectedContext'
import HomeLoadingContext from '../../../context/homeLoadingContext'
import LoadingIcon from '../../../assets/svg/loadingIcon'
import axios from 'axios'
import ApiAddress from '../../../ApiAddress'
import MessageContext from '../../../context/messageContext'

function Aside(props)
{
    const someInvoiceSelectedContext = useContext(SomeInvoiceSelectedContext)
    const loadingContext = useContext(HomeLoadingContext)
    const messageContext = useContext(MessageContext)

    const [getLoading,setGetLoading] = useState(false)
    

    const getInvoices = async()=>
    {
        loadingContext.setLoading(true)
        setGetLoading(true)
        if(getLoading && loadingContext.loading) return
    
        try
        {
            const response = await axios.get(`${ApiAddress}/downloadInvoices`)
            console.log(response)
        }
        catch(ex)
        {
            if(ex.response.status === 429)
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
                <button className={`${styles.btn} ${styles.generate} ${someInvoiceSelectedContext.someInvoiceSelected && !getLoading?'':styles.noneInvoiceSelected}`}>
                    <PDFIcon class={styles.btnSVG}/>
                    Generuj PDF
                </button>
            </section>

            


        </aside>
    )
}

export default Aside