import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalPosts } from './components/GlobalPosts.js';
import Home from './components/Home.js'
import Fav from './components/Fav.js'

import './App.css';
import Login from './pages/Login.js';

const App = () => {
  
  return (
    <GlobalPosts>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Fav />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </GlobalPosts>
  );
};

export default App;
