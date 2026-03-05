import { useEffect } from 'react'
import styles from './invoicesContainer.module.css'
import axios from 'axios'
import ApiAddress from '../../../ApiAddress'

function InvoicesContainer(props)
{
    const getAllInvoices = async() =>
    {
        try
        {
            const response = await axios.get(`${ApiAddress}/getAllInvoices`)
            console.log(response)
        }
        catch(ex)
        {
            console.log(ex)
        }
    }

    useEffect(()=>{
        getAllInvoices()
    },[])

    return(
        <div className={styles.container}></div>
    )
}

export default InvoicesContainer