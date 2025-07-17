import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalPosts } from './components/GlobalPosts.js';
import Home from './components/Home.js'
import Fav from './components/Fav.js'
import Login from './pages/Login.js';
import Posting from './pages/Posting.js';

import './App.css';


const App = () => {
  
  return (
    <GlobalPosts>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Fav />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posting" element={<Posting />} />
        </Routes>
      </BrowserRouter>
    </GlobalPosts>
  );
};

export default App;
