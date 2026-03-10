import styles from './propositionsItem.module.css'

function PropositionsItem(props)
{
    return (
    <li className={styles.li}>
        <div className={styles.item}>{props.NumerFaktury}</div>
        <div className={styles.item}>{props.DataSprzedazy}</div>
    </li>
    )
}

export default PropositionsItem