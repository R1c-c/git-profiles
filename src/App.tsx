import { BrowserRouter, Route, Routes } from 'react-router';
import { GlobalPosts } from './components/GlobalPosts.js';
import Home from './pages/Home.js'
import Fav from './pages/Fav.js'
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Posting from './pages/Posting.js';
import PostComponent from './pages/PostComponent.js';

import './App.css';
import Layout from './pages/Layout.js';


const App = () => {
  return (
    <GlobalPosts>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Fav />} />
          </Route>
          <Route path="/post/:id" element={<PostComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posting" element={<Posting />} />
        </Routes>
      </BrowserRouter>
    </GlobalPosts>
  );
};

export default App;
