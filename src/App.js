import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Invoice from './components/invoice/invoice'
import MessageContext from './context/messageContext';
import { useEffect, useState } from 'react';
import SelectedDateContext from './context/selectedDateContext';
import DownloadLoadingContext from './context/downloadLoadingContext';
import InvoiceSelectedContext from './context/InvoiceSelectedContext';

function App() {

  const [date,setDate] = useState({
        month:null,
        year:new Date().getFullYear()
    })

  const [invoiceSelected,setInvoiceSelected] = useState([])
  const [message,setMessage] = useState('')
  const [downloadLoading,setDownloadLoading] = useState(false)


  return (
    <InvoiceSelectedContext.Provider value={{invoiceSelected,setInvoiceSelected}}>
    <DownloadLoadingContext.Provider value={{downloadLoading,setDownloadLoading}}>
    <SelectedDateContext.Provider value={{date,setDate}}>
    <MessageContext.Provider value={{message,setMessage}}>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/invoice/:id' element={<Invoice />}/>
      </Routes>
    </Router>
    </MessageContext.Provider>
    </SelectedDateContext.Provider>
    </DownloadLoadingContext.Provider>
    </InvoiceSelectedContext.Provider>
  );
}

export default App;
