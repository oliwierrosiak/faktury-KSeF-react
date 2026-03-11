import { useEffect, useState } from 'react'
import Aside from './aside/aside'
import styles from './home.module.css'
import Main from './main/main'
import SelectedDateContext from '../../context/selectedDateContext'
import SomeInvoiceSelectedContext from '../../context/someInvoiceSelectedContext'
import HomeLoadingContext from '../../context/homeLoadingContext'

function Home()
{
    const [date,setDate] = useState({
        month:null,
        year:new Date().getFullYear()
    })

    const [homeLoading,setHomeLoading] = useState(true)

    const [someInvoiceSelected,setSomeInvoiceSelected] = useState(false)

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
        <HomeLoadingContext.Provider value={{loading:homeLoading,setLoading:setHomeLoading}}>
        <SomeInvoiceSelectedContext.Provider value={{someInvoiceSelected,setSomeInvoiceSelected}}>
        <SelectedDateContext.Provider value={{date,setDate}}>
        <div className={styles.container}>
            <Aside showAside={showAside} setShowAside={setShowAside}/>
            <Main showAside={showAside}/>
        </div>
        </SelectedDateContext.Provider>
        </SomeInvoiceSelectedContext.Provider>
        </HomeLoadingContext.Provider>
    )
}

export default Home