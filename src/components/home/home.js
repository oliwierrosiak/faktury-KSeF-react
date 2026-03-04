import { useState } from 'react'
import Aside from './aside/aside'
import styles from './home.module.css'
import Main from './main/main'

function Home()
{
    const [showAside,setShowAside] = useState(1)

    return(
        <div className={styles.container}>
            <Aside showAside={showAside} setShowAside={setShowAside}/>
            <Main showAside={showAside}/>
        </div>
    )
}

export default Home