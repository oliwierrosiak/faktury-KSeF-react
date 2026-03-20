import { useContext, useEffect, useState } from 'react'
import Aside from './aside/aside'
import styles from './home.module.css'
import Main from './main/main'
import InvoiceSelectedContext from '../../context/InvoiceSelectedContext'
import HomeLoadingContext from '../../context/homeLoadingContext'
import MessageContext from '../../context/messageContext'
import Message from '../message/message'
import DownloadNeInvoicesContext from '../../context/donwloadNewInvoicesContext'

function Home()
{

    const [homeLoading,setHomeLoading] = useState(true)
    const [newInvoices,setNewInvoices] = useState(false)
    const messageContext = useContext(MessageContext)

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
        <DownloadNeInvoicesContext.Provider value={{newInvoices,setNewInvoices}}>
        <HomeLoadingContext.Provider value={{loading:homeLoading,setLoading:setHomeLoading}}>
        <div className={styles.container}>
            <Aside showAside={showAside} setShowAside={setShowAside}/>
            <Main showAside={showAside}/>
            {messageContext.message && <Message/>}
        </div>
        </HomeLoadingContext.Provider>
        </DownloadNeInvoicesContext.Provider>
    )
}

export default Home