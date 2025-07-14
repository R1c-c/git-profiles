import React from 'react';
import { GlobalPosts } from './components/GlobalPosts.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Home from './components/Home.js'
import Fav from './components/Fav.js'
import './App.css';

interface Post {
  id: number,
  titulo: string,
  data: string,
  imagem_capa: string,
  conteudo: string,
}

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const App = () => {
  const [_, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const { data, error } = await supabase.from('posts').select();

    if (error) {
      console.error('Erro ao buscar posts:', error);
      return;
    }

    if (data) {
      setPosts(data as Post[]);
    }
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
