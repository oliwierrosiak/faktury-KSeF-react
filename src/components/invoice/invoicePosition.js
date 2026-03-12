import { useEffect, useRef, useState } from 'react'
import styles from './invoice.module.css'

function InvoicePosition(props)
{
    const [displayComment,setDisplayComment] = useState(false)

    const [comment,setComment] = useState('')

    const inputRef = useRef()

    useEffect(()=>{
        if(!displayComment)
        {
            setComment('')
        }
        else
        {
            inputRef.current.focus()
        }
    },[displayComment])

    return(
        <>
            <div className={`${styles.tableItem} ${styles.nameItem}`}>{props.name}</div>
            <div className={styles.tableItem}>{props.brutto} PLN</div>
            <div className={styles.tableItem}>menu akcji</div>
            <div className={styles.tableItem}>
                <button className={styles.commentBtn} onClick={e=>setDisplayComment(!displayComment)}>{displayComment?"Usuń Komentarz":"Dodaj Komentarz"}</button></div>
            {displayComment && <div className={styles.commentItem}>
                <input ref={inputRef} type='text' value={comment} onChange={e=>setComment(e.target.value)} className={styles.commentInput} placeholder='Wprowadź komentarz...'/>    
            </div>}
        </>
    )
}

export default InvoicePosition