import { useEffect, useState } from 'react'
import Aside from './aside/aside'
import styles from './home.module.css'
import Main from './main/main'

function Home()
{
    const showAsideSetter = () =>
    {
        const showAside = JSON.parse(localStorage.getItem('asideShow'))
        console.log(showAside || showAside === false ? showAside: true)
        return showAside || showAside === false ? showAside: true
    }

    const [showAside,setShowAside] = useState(showAsideSetter())

    useEffect(()=>{
        localStorage.setItem('asideShow',JSON.stringify(showAside))
    },[showAside])

    return(
        <div className={styles.container}>
            <Aside showAside={showAside} setShowAside={setShowAside}/>
            <Main showAside={showAside}/>
        </div>
    )
}

export default Home