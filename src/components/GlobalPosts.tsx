import React from 'react'
import GlobalModal from './GlobalModal';
import { createClient } from '@supabase/supabase-js';
import type { GlobalPostsType, Post } from '../typings/typings';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export const GlobalContext = React.createContext<GlobalPostsType>({
    searchInput: '', 
    posts: [], 
    activePost: null,
    isActive: false, 
    likedPostsStorage: [],
    setSearchInput: () => {}, 
    setPosts: () => {},
    setActivePost: () => {},
    setIsActive: () => {}, 
    updateLikedPostsStorage: () => {}, 
    handleActivePost: () => {},
}); 

export const GlobalPosts = ({ children }: { children: React.ReactNode }) => {
  const [searchInput, setSearchInput] = React.useState<string>('');
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [likedPostsStorage, setLikedPostsStorage] = React.useState<number[]>([]);
  const [activePost, setActivePost] = React.useState<Post | null>(null);
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const likedPosts = window.localStorage.getItem('likedPosts');

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

  React.useEffect(() => {
    getPosts();
  }, []);

  const handleActivePost = (post: Post | null) => {
    setActivePost(post)
  }

  React.useEffect(() => {
      if (!likedPosts) return;
      setLikedPostsStorage(JSON.parse(likedPosts));
    }, [])
    /* Checa se likedPosts é uma lista vazia*/
    /* Se sim, não faz nada. Se não, transforma likedPosts em um objeto e o guarda em likedPostsStorage */

    const updateLikedPostsStorage = (newList: number[]) => {
      setLikedPostsStorage(newList);
      window.localStorage.setItem('likedPosts', JSON.stringify(newList))
    }
    /* Uma função chamada updateLikedPostsStorage que leva como newList como parâmetro */
    /* Ela define likedPostsStorage como o conteúdo de Newlist e sobrescreve o que estiver no item do localStorage 'likedPosts' com o conteúdo da NewList transformada em String*/

  return (
    <GlobalContext.Provider value={{
      searchInput, 
      posts, 
      activePost,
      isActive, 
      likedPostsStorage, 
      setSearchInput, 
      setPosts,
      setActivePost,
      setIsActive, 
      updateLikedPostsStorage, 
      handleActivePost
    }}>
      <>
        {children}
        {
          activePost &&
          <GlobalModal post={activePost} />
        }
      </>
    </GlobalContext.Provider>
  )
};