import ArrowIcon from '../../../svg/arrowIcon'
import styles from './aside.module.css'

function Aside(props)
{
    return(
        <aside className={`${styles.aside} ${!props.showAside?styles.hideAside:''}`}>
            <div className={styles.arrow} onClick={e=>props.setShowAside(!props.showAside)}>
                <ArrowIcon class={`${styles.arrowIcon} ${!props.showAside?styles.arrowRotated:''}`}/>
            </div>
        </aside>
    )
}

export default Aside