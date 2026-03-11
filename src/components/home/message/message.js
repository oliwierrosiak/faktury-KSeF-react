import { useContext, useEffect, useRef, useState } from 'react'
import styles from './message.module.css'
import MessageContext from '../../../context/messageContext'
import InfoIcon from '../../../assets/svg/infoIcon'

function Message()
{
    const messageContext = useContext(MessageContext)
    const [displayMessage,setDisplayMessage] = useState(false)

     const timeout = useRef(null)

    useEffect(()=>{
        setDisplayMessage(true)
        timeout.current = setTimeout(()=>{
            setDisplayMessage(false)
            setTimeout(()=>{
                messageContext.setMessage('')
            },300)
        },3500)

        return()=>{
            clearTimeout(timeout.current)
            messageContext.setMessage('')
            setDisplayMessage(false)
        }
    },[])

    return(
        <div className={`${styles.messageContainer} ${displayMessage?styles.displayContainerMessage:''}`}>
            <InfoIcon class={styles.infoIcon}/>
            <h2 className={styles.content}>{messageContext.message}</h2>
            <div className={styles.progressBar}>
                <div className={`${styles.progress} ${displayMessage?styles.progressDisplay:''}`}></div>
            </div>
        </div>
    )
}

export default Message