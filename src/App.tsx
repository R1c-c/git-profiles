import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalPosts } from './components/GlobalPosts.js';
import Home from './pages/Home.js'
import Fav from './pages/Fav.js'
import Login from './pages/Login.js';
import Register from './pages/Register.js';
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
          <Route path="/register" element={<Register />} />
          <Route path="/posting" element={<Posting />} />
        </Routes>
      </BrowserRouter>
    </GlobalPosts>
  );
};

export default App;
