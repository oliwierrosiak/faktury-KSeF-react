import ArrowIcon from '../../../assets/svg/arrowIcon'
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
                <button className={`${styles.btn} ${styles.download}`}>Pobierz Faktury</button>
                <button className={`${styles.btn} ${styles.generate}`}>Generuj PDF</button>
            </section>

            


        </aside>
    )
}

export default Aside