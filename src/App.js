import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Invoice from './components/invoice/invoice'
import MessageContext from './context/messageContext';
import { useState } from 'react';

function App() {

  const [message,setMessage] = useState('')

  return (
    <MessageContext.Provider value={{message,setMessage}}>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/invoice/:id' element={<Invoice />}/>
      </Routes>
    </Router>
    </MessageContext.Provider>
  );
}

export default App;
