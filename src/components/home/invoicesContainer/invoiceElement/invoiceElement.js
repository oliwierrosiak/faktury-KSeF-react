import { useEffect, useId, useState } from 'react'
import styles from './invoiceElement.module.css'
import { useNavigate } from 'react-router-dom'

function InvoiceElement(props)
{

    const [displaySelectionList,setDisplaySelectionList] = useState(false)

    const id = useId()

    const navigate = useNavigate()

    const windowClick = (e) =>
    {
        const item = e.target.closest(`.${styles.selectionFiled}`)
        if(!item || item.id != id)
        {
            setDisplaySelectionList(false)
        }
    }

    useEffect(()=>{
        window.addEventListener('click',windowClick)
        return()=>{
            window.removeEventListener('click',windowClick)
        }
    },[])

    const selectionHeaderSetter = () =>
    {
        switch(props.action)
        {
            case 'notRecord':
                return 'Nie Księgować'
            case 'cost':
                return 'Koszt'
            default:
                return '--Wybierz Akcję--'
        }
    }

    const redirection = (e) =>
    {
        const el = e.target
        if(!el.classList.contains(styles.selectionFiled) && el.tagName != "H2" && !el.classList.contains(styles.selectListItem) && !el.classList.contains(styles.checkbox))
        {
            navigate(`/invoice/${props._id}`)
        }
    }

    return(
        <li onClick={redirection} className={`${styles.item} ${props.action === "notRecord"?styles.overlineItems:''}`}>
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

            <div className={styles.selectionFiled} id={id} onClick={e=>setDisplaySelectionList(!displaySelectionList)}>
                <h2 className={styles.selectionFiledHeader}>{selectionHeaderSetter()}</h2>
                <ul className={`${styles.selectList} ${displaySelectionList?styles.selectListDisplay:''}`}>
                    <li className={styles.selectListItem} onClick={e=>props.changeInvoiceAction(props._id,null)}>--Wybierz Akcję--</li>
                    <li onClick={e=>props.changeInvoiceAction(props._id,'notRecord')} className={styles.selectListItem}>Nie Księgować</li>
                    <li className={styles.selectListItem} onClick={e=>props.changeInvoiceAction(props._id,'cost')}>Koszt</li>
                </ul>
            </div>

            <div onClick={e=>props.changeSelection(props._id)} className={`${styles.checkbox} ${props.select?styles.checkboxSelected:''}`}></div>
        </li>
    )
}

export default InvoiceElement