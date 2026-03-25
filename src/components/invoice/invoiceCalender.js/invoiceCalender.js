import { useEffect, useState } from 'react'
import ArrowIcon from '../../../assets/svg/arrowIcon'
import styles from './invoiceCalender.module.css'

function InvoiceCalender(props)
{
    const [date,setDate] = useState(new Date())
    const months = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Pażdziernik","Listopad","Grudzień"]

    const [month,setMonth] = useState(months[date.getMonth()])
    const [year,setYear] = useState(date.getFullYear())

    const [arrowDisabled,setArrowDisabled] = useState(true)

    const setNewMonth = (direction) =>
    {
        if(direction === 'back')
        {
            date.setMonth(date.getMonth()-1)
            setMonth(months[date.getMonth()])
            setYear(date.getFullYear())
            setArrowDisabled(false) 
           
        }
        else if(direction === 'forward')
        {
            if(arrowDisabled) return
            date.setMonth(date.getMonth()+1)
            setMonth(months[date.getMonth()])
            setYear(date.getFullYear())
            const nextMonth = new Date()
            nextMonth.setDate(nextMonth.getMonth()+1)
            if(date.toISOString() >= nextMonth.toISOString())
            {
                setArrowDisabled(true)
            }
        }
    }

    const checkDay = (day) =>
    {
        const localDate = new Date(date)
        const currentDate = new Date()
        localDate.setDate(day)
        if(localDate.toISOString() <= currentDate.toISOString())
        {
            return ''
        }
        else
        {
            return styles.dayDisabled
        }
    }

    return(
        <section className={styles.calender}>
            <header className={styles.header}>
                <h2 className={styles.header1}>Data Opłacenia</h2>
                <div className={styles.month}>
                    <div className={styles.arrowContainer} onClick={e=>setNewMonth('back')}>
                        <ArrowIcon class={`${styles.arrow} ${styles.arrowRotated}`}/>
                    </div>

                    <h3>{month} {year}</h3>

                    <div className={styles.arrowContainer} onClick={e=>setNewMonth('forward')}>
                        <ArrowIcon class={`${styles.arrow} ${arrowDisabled?styles.arrowDisabled:''}`}/>

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

            <div className={`${styles.calenderItem} ${checkDay(1)}`}>1</div>
            <div className={`${styles.calenderItem} ${checkDay(2)}`}>2</div>
            <div className={`${styles.calenderItem} ${checkDay(3)}`}>3</div>
            <div className={`${styles.calenderItem} ${checkDay(4)}`}>4</div>
            <div className={`${styles.calenderItem} ${checkDay(5)}`}>5</div>
            <div className={`${styles.calenderItem} ${checkDay(6)}`}>6</div>
            <div className={`${styles.calenderItem} ${checkDay(7)}`}>7</div>
            <div className={`${styles.calenderItem} ${checkDay(8)}`}>8</div>
            <div className={`${styles.calenderItem} ${checkDay(9)}`}>9</div>
            <div className={`${styles.calenderItem} ${checkDay(10)}`}>10</div>
            <div className={`${styles.calenderItem} ${checkDay(11)}`}>11</div>
            <div className={`${styles.calenderItem} ${checkDay(12)}`}>12</div>
            <div className={`${styles.calenderItem} ${checkDay(13)}`}>13</div>
            <div className={`${styles.calenderItem} ${checkDay(14)}`}>14</div>
            <div className={`${styles.calenderItem} ${checkDay(15)}`}>15</div>
            <div className={`${styles.calenderItem} ${checkDay(16)}`}>16</div>
            <div className={`${styles.calenderItem} ${checkDay(17)}`}>17</div>
            <div className={`${styles.calenderItem} ${checkDay(18)}`}>18</div>
            <div className={`${styles.calenderItem} ${checkDay(19)}`}>19</div>
            <div className={`${styles.calenderItem} ${checkDay(20)}`}>20</div>
            <div className={`${styles.calenderItem} ${checkDay(21)}`}>21</div>
            <div className={`${styles.calenderItem} ${checkDay(22)}`}>22</div>
            <div className={`${styles.calenderItem} ${checkDay(23)}`}>23</div>
            <div className={`${styles.calenderItem} ${checkDay(24)}`}>24</div>
            <div className={`${styles.calenderItem} ${checkDay(25)}`}>25</div>
            <div className={`${styles.calenderItem} ${checkDay(26)}`}>26</div>
            <div className={`${styles.calenderItem} ${checkDay(27)}`}>27</div>
            <div className={`${styles.calenderItem} ${checkDay(28)}`}>28</div>
            <div className={`${styles.calenderItem} ${checkDay(29)}`}>29</div>
            <div className={`${styles.calenderItem} ${checkDay(30)}`}>30</div>
            <div className={`${styles.calenderItem} ${checkDay(31)}`}>31</div>
        </section>
    )
}

export default InvoiceCalender