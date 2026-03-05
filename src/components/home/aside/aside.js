import ArrowIcon from '../../../assets/svg/arrowIcon'
import DownloadIcon from '../../../assets/svg/downloadIcon'
import PDFIcon from '../../../assets/svg/pdfIcon'
import styles from './aside.module.css'
import Calender from './calender/calender'
import Search from './search/search'

function Aside(props)
{
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
                <button className={`${styles.btn} ${styles.download}`}>
                    <DownloadIcon class={styles.btnSVG}/>
                    Pobierz Faktury
                    </button>
                <button className={`${styles.btn} ${styles.generate}`}>
                    <PDFIcon class={styles.btnSVG}/>
                    Generuj PDF
                </button>
            </section>

            


        </aside>
    )
}

export default Aside