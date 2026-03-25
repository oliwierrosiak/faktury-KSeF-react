import { useEffect, useState } from 'react'
import ArrowIcon from '../../../assets/svg/arrowIcon'
import styles from './invoiceCalender.module.css'

function InvoiceCalender(props)
{
    const [date,setDate] = useState(new Date())
    const months = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Pażdziernik","Listopad","Grudzień"]

    const [month,setMonth] = useState(months[date.getMonth()])
    const [year,setYear] = useState(date.getFullYear())
    const [selectedDay,setSelectedDay] = useState(null)

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

            if(selectedDay == day)
            {
                return styles.calenderItemSelected
            }
            else
            {
                return ''

            }
        }
        else
        {
            return styles.dayDisabled
        }
    }

    const selectDay = (day,e) =>
    {
        if(e.target.classList.contains(styles.dayDisabled))
        {
            return
        }
        if(selectedDay == day)
        {
            setSelectedDay(null)
        }
        else
        {
            setSelectedDay(day)
        }
    }

    useEffect(()=>{
        setSelectedDay(null)
    },[month])

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

            <div className={`${styles.calenderItem} ${checkDay(1)}`} onClick={e=>selectDay(1,e)}>1</div>
            <div className={`${styles.calenderItem} ${checkDay(2)}`} onClick={e=>selectDay(2,e)}>2</div>
            <div className={`${styles.calenderItem} ${checkDay(3)}`} onClick={e=>selectDay(3,e)}>3</div>
            <div className={`${styles.calenderItem} ${checkDay(4)}`} onClick={e=>selectDay(4,e)}>4</div>
            <div className={`${styles.calenderItem} ${checkDay(5)}`} onClick={e=>selectDay(5,e)}>5</div>
            <div className={`${styles.calenderItem} ${checkDay(6)}`} onClick={e=>selectDay(6,e)}>6</div>
            <div className={`${styles.calenderItem} ${checkDay(7)}`} onClick={e=>selectDay(7,e)}>7</div>
            <div className={`${styles.calenderItem} ${checkDay(8)}`} onClick={e=>selectDay(8,e)}>8</div>
            <div className={`${styles.calenderItem} ${checkDay(9)}`} onClick={e=>selectDay(9,e)}>9</div>
            <div className={`${styles.calenderItem} ${checkDay(10)}`} onClick={e=>selectDay(10,e)}>10</div>
            <div className={`${styles.calenderItem} ${checkDay(11)}`} onClick={e=>selectDay(11,e)}>11</div>
            <div className={`${styles.calenderItem} ${checkDay(12)}`} onClick={e=>selectDay(12,e)}>12</div>
            <div className={`${styles.calenderItem} ${checkDay(13)}`} onClick={e=>selectDay(13,e)}>13</div>
            <div className={`${styles.calenderItem} ${checkDay(14)}`} onClick={e=>selectDay(14,e)}>14</div>
            <div className={`${styles.calenderItem} ${checkDay(15)}`} onClick={e=>selectDay(15,e)}>15</div>
            <div className={`${styles.calenderItem} ${checkDay(16)}`} onClick={e=>selectDay(16,e)}>16</div>
            <div className={`${styles.calenderItem} ${checkDay(17)}`} onClick={e=>selectDay(17,e)}>17</div>
            <div className={`${styles.calenderItem} ${checkDay(18)}`} onClick={e=>selectDay(18,e)}>18</div>
            <div className={`${styles.calenderItem} ${checkDay(19)}`} onClick={e=>selectDay(19,e)}>19</div>
            <div className={`${styles.calenderItem} ${checkDay(20)}`} onClick={e=>selectDay(20,e)}>20</div>
            <div className={`${styles.calenderItem} ${checkDay(21)}`} onClick={e=>selectDay(21,e)}>21</div>
            <div className={`${styles.calenderItem} ${checkDay(22)}`} onClick={e=>selectDay(22,e)}>22</div>
            <div className={`${styles.calenderItem} ${checkDay(23)}`} onClick={e=>selectDay(23,e)}>23</div>
            <div className={`${styles.calenderItem} ${checkDay(24)}`} onClick={e=>selectDay(24,e)}>24</div>
            <div className={`${styles.calenderItem} ${checkDay(25)}`} onClick={e=>selectDay(25,e)}>25</div>
            <div className={`${styles.calenderItem} ${checkDay(26)}`} onClick={e=>selectDay(26,e)}>26</div>
            <div className={`${styles.calenderItem} ${checkDay(27)}`} onClick={e=>selectDay(27,e)}>27</div>
            <div className={`${styles.calenderItem} ${checkDay(28)}`} onClick={e=>selectDay(28,e)}>28</div>
            <div className={`${styles.calenderItem} ${checkDay(29)}`} onClick={e=>selectDay(29,e)}>29</div>
            <div className={`${styles.calenderItem} ${checkDay(30)}`} onClick={e=>selectDay(30,e)}>30</div>
            <div className={`${styles.calenderItem} ${checkDay(31)}`} onClick={e=>selectDay(31,e)}>31</div>
        </section>
    )
}

export default InvoiceCalender