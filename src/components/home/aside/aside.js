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

function Aside(props)
{
    const someInvoiceSelectedContext = useContext(SomeInvoiceSelectedContext)
    const loadingContext = useContext(HomeLoadingContext)

    const [getLoading,setGetLoading] = useState(false)
    

    const getInvoices = async()=>
    {
        loadingContext.setLoading(true)
        setGetLoading(true)
        if(getLoading && loadingContext.loading)
        {
            return
        }
        console.log("click")
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