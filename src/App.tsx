import { BrowserRouter, Route, Routes } from 'react-router';

import { GlobalContext, GlobalPosts } from './components/GlobalPosts.js';
import Home from './pages/Home.js'
import Fav from './pages/Fav.js'
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Post from './pages/Post.js';
import Posting from './pages/Posting.js';

import './App.css';
import React from 'react';
import Layout from './pages/Layout.js';

const App = () => {
  const { activePost } = React.useContext(GlobalContext);

  console.log(activePost)

  return (
    <GlobalPosts>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Fav />} />

          </Route>
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posting" element={<Posting />} />
        </Routes>
      </BrowserRouter>
    </GlobalPosts>
  );
};

export default App;
