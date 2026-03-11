import { useNavigate } from 'react-router-dom'
import styles from './propositionsItem.module.css'

function PropositionsItem(props)
{
    const navigate = useNavigate()

    return (
    <li className={styles.li} onClick={e=>navigate(`/invoice/${props.id}`)}>
        <div className={styles.item}>{props.invoiceNumber}</div>
        <div className={styles.item}>{props.issueDate}</div>
    </li>
    )
}

export default PropositionsItem