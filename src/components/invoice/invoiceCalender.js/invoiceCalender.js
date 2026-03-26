import { useEffect, useState } from 'react'
import ArrowIcon from '../../../assets/svg/arrowIcon'
import styles from './invoiceCalender.module.css'

function InvoiceCalender(props)
{
    const endMonthDateSetter = () =>
    {
        const currentMonth = new Date(date)
        currentMonth.setMonth(currentMonth.getMonth()+1)
        currentMonth.setDate(1-1)
        return currentMonth.getDate()
    }

    const [date,setDate] = useState(new Date())
    const months = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Pażdziernik","Listopad","Grudzień"]

    const [month,setMonth] = useState(months[date.getMonth()])
    const [year,setYear] = useState(date.getFullYear())
    const [selectedDay,setSelectedDay] = useState(null)
    const [blankDays,setBlankDays] = useState([])
    const [endMonthDate,setEndMonthDate] = useState(endMonthDateSetter)
    const [days,setDays] = useState([])
    const [arrowDisabled,setArrowDisabled] = useState(true)

    useEffect(()=>{
        const firstDay = new Date(date)
        firstDay.setDate(1)
        let day = firstDay.getDay()
        if(day === 0)
        {
            day = 7
        }
        const array = []
        for(let i = 1;i<day;i++)
        {
            array.push(i)
        }
        setBlankDays(array)
    },[endMonthDate])

    useEffect(()=>{
        const array = []
        for(let i = 1;i<=endMonthDate;i++)
        {
            array.push(i)
        }
        setDays(array)
    },[endMonthDate])

    const setNewMonth = (direction) =>
    {
        if(direction === 'back')
        {
            date.setMonth(date.getMonth()-1)
            setMonth(months[date.getMonth()])
            setYear(date.getFullYear())
            setArrowDisabled(false) 
            setEndMonthDate(endMonthDateSetter())
           
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
            setEndMonthDate(endMonthDateSetter())
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

            {blankDays.map(x=><div key={Math.floor(Math.random()*100000)} className={`${styles.calenderItem} ${styles.calenderBlankItem}`}></div>)}

            {days.map(x=><div key={Math.floor(Math.random()*100000)} className={`${styles.calenderItem} ${checkDay(x)}`} onClick={e=>selectDay(x,e)}>{x}</div>)}

        </section>
    )
}

export default InvoiceCalender