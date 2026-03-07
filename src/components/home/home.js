import { useEffect, useState } from 'react'
import Aside from './aside/aside'
import styles from './home.module.css'
import Main from './main/main'
import SelectedDateContext from '../../context/selectedDateContext'
import SomeInvoiceSelectedContext from '../../context/someInvoiceSelectedContext'

function Home()
{
    const [date,setDate] = useState({
        month:null,
        year:new Date().getFullYear()
    })

    const [someInvoiceSelected,setSomeInvoiceSelected] = useState(false)

    useEffect(()=>
    {
        console.log(someInvoiceSelected)
    },[someInvoiceSelected])

    const showAsideSetter = () =>
    {
        const showAside = JSON.parse(localStorage.getItem('asideShow'))
        return showAside || showAside === false ? showAside: true
    }

    const [showAside,setShowAside] = useState(showAsideSetter())

    useEffect(()=>{
        localStorage.setItem('asideShow',JSON.stringify(showAside))
    },[showAside])

    return(
        <SomeInvoiceSelectedContext.Provider value={{someInvoiceSelected,setSomeInvoiceSelected}}>
        <SelectedDateContext.Provider value={{date,setDate}}>
        <div className={styles.container}>
            <Aside showAside={showAside} setShowAside={setShowAside}/>
            <Main showAside={showAside}/>
        </div>
        </SelectedDateContext.Provider>
        </SomeInvoiceSelectedContext.Provider>
    )
}

export default Home