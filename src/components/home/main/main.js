import { useEffect } from 'react'
import styles from './main.module.css'

function Main(props)
{
    useEffect(()=>{
        console.log(props.showAside)
    },[])

    return(
        <main className={`${styles.main} ${!props.showAside?styles.mainFullWidth:''}`}>
            <h1>Wszytskie faktury</h1>
        </main>
    )
}

export default Main