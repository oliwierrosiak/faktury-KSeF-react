import { useEffect } from 'react'
import styles from './main.module.css'

function Main(props)
{

    return(
        <main className={`${styles.main} ${!props.showAside?styles.mainFullWidth:''}`}>
            {/* <h1>Wszytskie faktury</h1> */}
        </main>
    )
}

export default Main