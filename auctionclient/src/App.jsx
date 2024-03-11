import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import { useState } from 'react';
import Products from './components/Products';
import Auctions from './components/Auctions';
import ManageAuction from './components/ManageAuction';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login id={id} setId={setId} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>} />
          <Route path="/register" element={<Register/>} />
          <Route path='/menu' element={<Menu/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/auctions' element={<Auctions/>} />
          <Route path='/auctions-manager' element={<ManageAuction/>} />
        </Routes>
    </Router>
  );
}

export default App;
