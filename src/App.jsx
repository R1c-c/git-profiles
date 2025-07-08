import React from 'react';
import { GlobalPosts } from './components/GlobalPosts.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx'
import Fav from './components/Fav.jsx'
import './App.css';


const App = () => {

  return (
    <GlobalPosts>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/favorites" element={<Fav />}/>    
        </Routes>
      </BrowserRouter>
    </GlobalPosts>
  );
};

export default App;
