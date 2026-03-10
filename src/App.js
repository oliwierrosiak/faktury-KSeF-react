import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Invoice from './components/invoice/invoice'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/invoice/:id' element={<Invoice />}/>
      </Routes>
    </Router>
  );
}

export default App;
