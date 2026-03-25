import { useEffect, useState } from 'react'
import ArrowIcon from '../../../assets/svg/arrowIcon'
import styles from './invoiceCalender.module.css'

function InvoiceCalender(props)
{
    const [date,setDate] = useState(new Date())
    const months = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Pażdziernik","Listopad","Grudzień"]

    const [month,setMonth] = useState(months[date.getMonth()])
    const [year,setYear] = useState(date.getFullYear())

    const setNewMonth = (direction,e) =>
    {
        if(e.target.classList.contains(styles.arrowDisabled)) return
        if(direction === 'back')
        {
            date.setMonth(date.getMonth()-1)
            setMonth(months[date.getMonth()])
            setYear(date.getFullYear())
        }
        else if(direction === 'forward')
        {
            date.setMonth(date.getMonth()+1)
            setMonth(months[date.getMonth()])
            setYear(date.getFullYear()) 
        }
    }

    const checkArrowDisabled = () =>
    {
        const currentDate = new Date()
        const selectedDate = new Date(date)
        selectedDate.setMonth(selectedDate.getMonth()+1)
        if(currentDate.toISOString() <= selectedDate.toISOString())
        {
            return styles.arrowDisabled
        }
        else
        {
            return ''
        }
    }

    return(
        <section className={styles.calender}>
            <header className={styles.header}>
                <h2 className={styles.header1}>Data Opłacenia</h2>
                <div className={styles.month}>
                    <div className={styles.arrowContainer} onClick={e=>setNewMonth('back',e)}>
                        <ArrowIcon class={`${styles.arrow} ${styles.arrowRotated}`}/>
                    </div>

                    <h3>{month} {year}</h3>

                    <div className={styles.arrowContainer} onClick={e=>setNewMonth('forward',e)}>
                        <ArrowIcon class={`${styles.arrow} ${checkArrowDisabled()}`}/>

                    </div>
                </div>
            </header>
            <div className={styles.calenderHeader}>Pon</div>
            <div className={styles.calenderHeader}>Wt</div>
            <div className={styles.calenderHeader}>Śr</div>
            <div className={styles.calenderHeader}>Czw</div>
            <div className={styles.calenderHeader}>Pt</div>
            <div className={styles.calenderHeader}>Sob</div>
            <div className={styles.calenderHeader}>Nie</div>

            <div className={styles.calenderItem}>1</div>
            <div className={styles.calenderItem}>2</div>
            <div className={styles.calenderItem}>3</div>
            <div className={styles.calenderItem}>4</div>
            <div className={styles.calenderItem}>5</div>
            <div className={styles.calenderItem}>6</div>
            <div className={`${styles.calenderItem} ${styles.calenderItemSelected}`}>7</div>
            <div className={styles.calenderItem}>8</div>
            <div className={styles.calenderItem}>9</div>
            <div className={styles.calenderItem}>10</div>
            <div className={styles.calenderItem}>11</div>
            <div className={styles.calenderItem}>12</div>
            <div className={styles.calenderItem}>13</div>
            <div className={styles.calenderItem}>14</div>
            <div className={styles.calenderItem}>15</div>
            <div className={styles.calenderItem}>16</div>
            <div className={styles.calenderItem}>17</div>
            <div className={styles.calenderItem}>18</div>
            <div className={styles.calenderItem}>19</div>
            <div className={styles.calenderItem}>20</div>
            <div className={styles.calenderItem}>21</div>
            <div className={styles.calenderItem}>22</div>
            <div className={styles.calenderItem}>23</div>
            <div className={styles.calenderItem}>24</div>
            <div className={styles.calenderItem}>25</div>
            <div className={styles.calenderItem}>26</div>
            <div className={styles.calenderItem}>27</div>
            <div className={styles.calenderItem}>28</div>
            <div className={styles.calenderItem}>29</div>
            <div className={styles.calenderItem}>30</div>
            <div className={styles.calenderItem}>31</div>
        </section>
    )
}

export default InvoiceCalender