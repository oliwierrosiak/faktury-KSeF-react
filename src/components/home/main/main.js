import InvoicesContainer from '../invoicesContainer/invoicesContainer'
import styles from './main.module.css'
import SelectedDateContext from '../../../context/selectedDateContext'
import { useContext, useEffect, useState } from 'react'

function Main(props)
{

    const selectedDateContext = useContext(SelectedDateContext)

    const [header,setHeader] = useState('Wszytskie Faktury')

    const months = ['Styczeń',"Luty","Marzec","Kwiecień","Maj","Czerwiec",'Lipiec',"Sierpień","Wrzesień","Październik","Listopad",'Grudzień']

    useEffect(()=>{
        if(selectedDateContext.date.month === null)
        {
            setHeader('Wszytskie Faktury')
        }
        else
        {
            setHeader(`Faktury ${months[selectedDateContext.date.month]} ${selectedDateContext.date.year}`)
        }
    },[selectedDateContext.date])

    return(
        <main className={`${styles.main} ${!props.showAside?styles.mainFullWidth:''}`}>

            <h1 className={styles.header}>{header}</h1>

            <InvoicesContainer />

        </main>
    )
}

export default Main