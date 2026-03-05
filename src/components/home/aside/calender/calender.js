import ArrowIcon from '../../../../assets/svg/arrowIcon'
import styles from './calender.module.css'

function Calender()
{
    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.arrow}>
                    <ArrowIcon class={`${styles.arrowIcon} ${styles.arrowRotated}`}/>
                </div>
                <h2>2026</h2>
                <div className={`${styles.arrow} ${styles.arrowDisabled}`}>
                    <ArrowIcon class={styles.arrowIcon}/>
                </div>
            </header>

            <div className={styles.item}>Styczeń</div>
            <div className={styles.item}>Luty</div>
            <div className={`${styles.item} ${styles.selected}`}>Marzec</div>
            <div className={styles.item}>Kwiecień</div>
            <div className={styles.item}>Maj</div>
            <div className={styles.item}>Czerwiec</div>
            <div className={styles.item}>Lipiec</div>
            <div className={styles.item}>Sierpień</div>
            <div className={`${styles.item} ${styles.disabled}`}>Wrzesień</div>
            <div className={`${styles.item} ${styles.disabled}`}>Październik</div>
            <div className={`${styles.item} ${styles.disabled}`}>Listopad</div>
            <div className={`${styles.item} ${styles.disabled}`}>Grudzień</div>
        </div>
    )
}

export default Calender