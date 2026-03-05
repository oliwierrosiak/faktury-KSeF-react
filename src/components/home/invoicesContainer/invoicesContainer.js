import { useEffect, useState } from 'react'
import styles from './invoicesContainer.module.css'
import axios from 'axios'
import ApiAddress from '../../../ApiAddress'
import InvoicesNotFound from '../../../assets/svg/invoicesNotFoundIcon'
import ConnectionErrorIcon from '../../../assets/svg/connectionErrorIcon'

function InvoicesContainer(props)
{
    const [error,setError] = useState({type:null,info:''})

    const getAllInvoices = async() =>
    {
        try
        {
            const response = await axios.get(`${ApiAddress}/getAllInvoices`)
            console.log(response)
        }
        catch(ex)
        {
            if(ex.status === 404)
            {
                setError({type:404,info:'Nie znaleziono faktur'})
            }
            else
            {
                setError({type:"Connection",info:"Brak połączenia z serwerem"})
            }
        }
    }

    useEffect(()=>{
        getAllInvoices()
    },[])

    return(
        <div className={styles.container}>
            {error.type && <div className={styles.errorContainer}>
                {error.type === 404?
                <InvoicesNotFound class={styles.notFoundSVG}/>
                :
                <ConnectionErrorIcon class={styles.errorSVG}/>
                }
                <h2>{error.info}</h2>    
            </div>}
        </div>
    )
}

export default InvoicesContainer