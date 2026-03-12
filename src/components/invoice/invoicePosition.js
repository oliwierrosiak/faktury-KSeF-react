import { useEffect, useRef, useState } from 'react'
import styles from './invoice.module.css'
import axios from 'axios'
import ApiAddress from '../../ApiAddress'

function InvoicePosition(props)
{
    const [displayComment,setDisplayComment] = useState(props.comment?true:false)

    const [comment,setComment] = useState(props.comment?props.comment:'')

    const inputRef = useRef()

    const commentBlur = async() =>
    {
        try
        {
            const response = await axios.post(`${ApiAddress}/updateComment`,{content:comment,id:props._id})
        }
        catch(ex)
        {
            // obsluzyc błąd komentarza
        }
    }

    const commentDeleted = async() =>
    {
        try
        {
            await axios.post(`${ApiAddress}/updateComment`,{content:'',id:props._id})
        }
        catch(ex)
        {
            // obsluzyc błąd komentarza
        }
    }

    useEffect(()=>{
        if(!displayComment)
        {
            setComment('')
            commentDeleted()
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
                <input onBlur={commentBlur} ref={inputRef} type='text' value={comment} onChange={e=>setComment(e.target.value)} className={styles.commentInput} placeholder='Wprowadź komentarz...'/>    
            </div>}
        </>
    )
}

export default InvoicePosition