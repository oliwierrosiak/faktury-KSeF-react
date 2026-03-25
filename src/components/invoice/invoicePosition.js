import { useContext, useEffect, useId, useRef, useState } from 'react'
import styles from './invoice.module.css'
import axios from 'axios'
import ApiAddress from '../../ApiAddress'
import { useParams } from 'react-router-dom'
import MessageContext from '../../context/messageContext'

function InvoicePosition(props)
{
    const checkInvoiceActionLocked = (action) =>
    {
        if(action === "notRecord" || action === "cost")
        {
            return true
        }
        else
        {
            return false
        }
    }

    const actionSetter = () =>
    {
        if(props.invoiceAction)
        {
            return props.invoiceAction
        }

        return props.action
    }

    const [displayComment,setDisplayComment] = useState(props.comment?true:false)

    const [comment,setComment] = useState(props.comment?props.comment:'')
    
    const [displayActionMenu,setDisplayActionMenu] = useState(false)
    const [action,setAction] = useState(actionSetter())
    const [actionLocked] = useState(checkInvoiceActionLocked(props.invoiceAction))

    const inputRef = useRef()

    const params = useParams()

    const messageContext = useContext(MessageContext)

    const id = useId()

    const commentBlur = async() =>
    {
        try
        {
            await axios.post(`${ApiAddress}/updateComment`,{content:comment,id:props._id})
        }
        catch(ex)
        {
            messageContext.setMessage('Nie udało się zapisać komentarza')
            props.setLoading(true)
            props.getInvoiceData()
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
            messageContext.setMessage('Nie udało się usunąć komentarza')
            props.setLoading(true)
            props.getInvoiceData()
        }
    }

    useEffect(()=>{
        if(!displayComment && comment != '')
        {
            setComment('')
            commentDeleted()
        }
    },[displayComment])

    const changePositionAction = async(action) =>
    {
        setAction(action)
        try
        {
            await axios.put(`${ApiAddress}/updateInvoicePositionAction`,{
                invoiceId:params.id,
                positionId:props._id,
                action
            })
        }
        catch(ex)
        {
            messageContext.setMessage("Nie udało się zapisać akcji dla pozycji faktury")
            props.setLoading(true)
            props.getInvoiceData()
        }
    }

    const getActionPolishName = (value) =>
    {
        switch(value)
        {
            case 'notRecord':
                return 'Nie Księgować'
            case 'cost':
                return "Koszt"
            case 'goods':
                return "Towar Handlowy"
            default:
                return '--Wybierz Akcję--'
        }
    }

    const windowClick = (e) =>
    {
        if(e.target.closest(`.${styles.action}`)?.id != id)
        {
            setDisplayActionMenu(false)
        }
    }

    useEffect(()=>{
        window.addEventListener("click",windowClick)
        return()=>
        {
            window.removeEventListener("click",windowClick)
        }
    },[])

    return(
        <>
            <div className={styles.tableItem}>{props.index+1}.</div>
            <div className={`${styles.tableItem} ${styles.nameItem} ${action === 'notRecord'?styles.elementOverline:''}`}>{props.name}</div>
            <div className={`${styles.tableItem} ${action === 'notRecord'?styles.elementOverline:''}`}>{props.grossAmount.toFixed(2)} {props.currency}</div>
            <div className={styles.tableItem}>
                <div className={`
                    ${styles.action} ${actionLocked?styles.actionLocked:''}`} onClick={e=>setDisplayActionMenu(!displayActionMenu)} id={id}>
                    <h3>{getActionPolishName(action)}</h3>
                    {displayActionMenu && !actionLocked && <ul className={styles.list}>
                        <li onClick={e=>changePositionAction(null)}>--Wybierz Akcję--</li>
                        <li onClick={e=>changePositionAction('notRecord')}>Nie Księgować</li>
                        <li onClick={e=>changePositionAction('cost')}>Koszt</li>
                        <li onClick={e=>changePositionAction("goods")}>Towar Handlowy</li>
                    </ul>}
                </div>
            </div>
            <div className={styles.tableItem}>
                <button className={styles.commentBtn} onClick={e=>setDisplayComment(!displayComment)}>{displayComment?"Usuń Komentarz":"Dodaj Komentarz"}</button></div>
            {displayComment && <div className={styles.commentItem}>
                <input onBlur={commentBlur} ref={inputRef} type='text' value={comment} onChange={e=>setComment(e.target.value)} className={styles.commentInput} placeholder='Wprowadź komentarz...'/>    
            </div>}
        </>
    )
}

export default InvoicePosition