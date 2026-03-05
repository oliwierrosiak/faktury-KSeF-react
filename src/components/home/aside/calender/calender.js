import { useContext, useEffect, useState } from 'react'
import ArrowIcon from '../../../../assets/svg/arrowIcon'
import styles from './calender.module.css'
import SelectedDateContext from '../../../../context/selectedDateContext'

function Calender()
{
    const date = new Date()

    const [year,setYear] = useState(2026)
    const [currentMonth,setCurrentMonth] = useState(date.getMonth())
    const [selectedMonth,setSelectedMonth] = useState(null)

    const selectedDateContext = useContext(SelectedDateContext)

    const setNewYear = (e,dir) =>
    {
        if(e.target.closest(`.${styles.arrow}`).classList.contains(styles.arrowDisabled)) return
        setYear(dir === "asc"?year+1:year-1)
        setSelectedMonth(null)
    }

    const setDisableMonth = (month) =>
    {
        if(year === date.getFullYear() && month > currentMonth)
        {
            return styles.disabled
        }
        else
        {
            return ''
        }
    }

    const setMonth = (month) =>
    {
        if(selectedMonth === month)
        {
            setSelectedMonth(null)
            return 
        }
        if(year === date.getFullYear())
        {
            if(month <= currentMonth)
            {
                setSelectedMonth(month)
            }
        }
        else
        {
            setSelectedMonth(month)
        }
        
    }

    useEffect(()=>{
        selectedDateContext.setDate({
            month:selectedMonth,
            year:year
        })
    },[selectedMonth])

    const checkSelect = (month) =>
    {
        if(month === selectedMonth)
        {
            return styles.selected
        }
        else
        {
            return ''
        }
    }

    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <div onClick={e=>setNewYear(e,'desc')} className={styles.arrow}>
                    <ArrowIcon class={`${styles.arrowIcon} ${styles.arrowRotated}`}/>
                </div>
                <h2>{year}</h2>
                <div onClick={e=>setNewYear(e,'asc')} className={`${styles.arrow} ${year === date.getFullYear()?styles.arrowDisabled:''}`}>
                    <ArrowIcon class={styles.arrowIcon}/>
                </div>
            </header>

            <div onClick={e=>setMonth(0)} className={`${styles.item} ${setDisableMonth(0)} ${checkSelect(0)}`}>Styczeń</div>
            <div onClick={e=>setMonth(1)} className={`${styles.item} ${setDisableMonth(1)} ${checkSelect(1)}`}>Luty</div>
            <div onClick={e=>setMonth(2)} className={`${styles.item} ${setDisableMonth(2)} ${checkSelect(2)}`}>Marzec</div>
            <div onClick={e=>setMonth(3)} className={`${styles.item} ${setDisableMonth(3)} ${checkSelect(3)}`}>Kwiecień</div>
            <div onClick={e=>setMonth(4)} className={`${styles.item} ${setDisableMonth(4)} ${checkSelect(4)}`}>Maj</div>
            <div onClick={e=>setMonth(5)} className={`${styles.item} ${setDisableMonth(5)} ${checkSelect(5)}`}>Czerwiec</div>
            <div onClick={e=>setMonth(6)} className={`${styles.item} ${setDisableMonth(6)} ${checkSelect(6)}`}>Lipiec</div>
            <div onClick={e=>setMonth(7)} className={`${styles.item} ${setDisableMonth(7)} ${checkSelect(7)}`}>Sierpień</div>
            <div onClick={e=>setMonth(8)} className={`${styles.item} ${setDisableMonth(8)} ${checkSelect(8)}`}>Wrzesień</div>
            <div onClick={e=>setMonth(9)} className={`${styles.item} ${setDisableMonth(9)} ${checkSelect(9)}`}>Październik</div>
            <div onClick={e=>setMonth(10)} className={`${styles.item} ${setDisableMonth(10)} ${checkSelect(10)}`}>Listopad</div>
            <div onClick={e=>setMonth(11)} className={`${styles.item} ${setDisableMonth(11)} ${checkSelect(11)}`}>Grudzień</div>
        </div>
    )
}

export default Calender