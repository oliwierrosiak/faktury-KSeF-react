import { useState } from 'react'
import styles from './invoiceElement.module.css'

function InvoiceElement(props)
{
    const [selected,setSelected] = useState(false)

    return(
        <li className={styles.item}>
            <div className={styles.element}>
                {props.Fa.NumerFaktury}
            </div>

            <div className={styles.element}>
                {props.Fa.DataWystawienia}
            </div>

            <div className={styles.element}>
                {props.Podsumowanie.Brutto} {props.Fa.Waluta}
            </div>

            <div className={styles.line}></div>

            <ul className={styles.selectList}>
            </ul>

            <div onClick={e=>setSelected(!selected)} className={`${styles.checkbox} ${selected?styles.checkboxSelected:''}`}></div>
        </li>
    )
}

export default InvoiceElement