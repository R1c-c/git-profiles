import React from 'react';
import { GlobalPosts } from './components/GlobalPosts.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Home from './components/Home.jsx'
import Fav from './components/Fav.jsx'
import './App.css';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const App = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const { data } = await supabase.from('posts').select();
    setPosts(data);
  }

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
