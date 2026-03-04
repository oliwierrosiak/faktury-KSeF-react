import InvoicesContainer from '../invoicesContainer/invoicesContainer'
import styles from './main.module.css'

function Main(props)
{

    return(
        <main className={`${styles.main} ${!props.showAside?styles.mainFullWidth:''}`}>

            <h1 className={styles.header}>Wszytskie Faktury</h1>

            <InvoicesContainer />

        </main>
    )
}

export default Main