import styles from './invoice.module.css'

function InvoicePosition(props)
{
    return(
        <>
            <div className={`${styles.tableItem} ${styles.nameItem}`}>{props.name}</div>
            <div className={styles.tableItem}>{props.netto} PLN</div>
            <div className={styles.tableItem}>{props.vat}</div>
            <div className={styles.tableItem}>{props.brutto} PLN</div>
            <div className={styles.tableItem}>menu akcji</div>
        </>
    )
}

export default InvoicePosition