import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Invoice from './components/invoice/invoice'
import MessageContext from './context/messageContext';
import { useState } from 'react';
import SelectedDateContext from './context/selectedDateContext';

function App() {

  const [date,setDate] = useState({
        month:null,
        year:new Date().getFullYear()
    })

  const [message,setMessage] = useState('')

  return (
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
  );
}

export default App;
