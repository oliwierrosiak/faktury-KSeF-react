import { useContext, useEffect, useState } from 'react'
import ArrowIcon from '../../../../assets/svg/arrowIcon'
import styles from './calender.module.css'
import SelectedDateContext from '../../../../context/selectedDateContext'
import HomeLoadingContext from '../../../../context/homeLoadingContext'
import DownloadNeInvoicesContext from '../../../../context/donwloadNewInvoicesContext'

function Calender()
{
    const date = new Date()

    const selectedDateContext = useContext(SelectedDateContext)
    const newInvoicesContext = useContext(DownloadNeInvoicesContext)

    const yearSetter = () =>
    {
        if(selectedDateContext.date.year != null)
        {
            return selectedDateContext.date.year
        }
        else
        {
            return date.getFullYear()

        }
    }

    const selectedMonthSetter = () =>
    {
        if(selectedDateContext.date.month != null)
        {
            return selectedDateContext.date.month
        }
        else
        {
            return null

        }
    }

    const [year,setYear] = useState(yearSetter())
    const [currentMonth,setCurrentMonth] = useState(date.getMonth())
    const [selectedMonth,setSelectedMonth] = useState(selectedMonthSetter())

    const loadingContext = useContext(HomeLoadingContext)

    useEffect(()=>{
        if(newInvoicesContext.newInvoices)
        {
            setYear(date.getFullYear())
            setCurrentMonth(date.getMonth())
            setSelectedMonth(null)

        }
    },[newInvoicesContext.newInvoices])

    const setNewYear = (e,dir) =>
    {
        if(loadingContext.loading) return
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
        if(loadingContext.loading) return

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
        <div className={`${styles.container} ${loadingContext.loading?styles.containerLoading:''}`}>
            <header className={styles.header}>
                <div onClick={e=>setNewYear(e,'desc')} className={`${styles.arrow} ${loadingContext.loading?styles.arrowWhileLoading:''}`}>
                    <ArrowIcon class={`${styles.arrowIcon} ${styles.arrowRotated}`}/>
                </div>
                <h2>{year}</h2>
                <div onClick={e=>setNewYear(e,'asc')} className={`${styles.arrow} ${year === date.getFullYear()?styles.arrowDisabled:''} ${loadingContext.loading?styles.arrowWhileLoading:''}`}>
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