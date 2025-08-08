import React, { useEffect, useState } from 'react'
import { type Session, type User } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase';

import GlobalModal from './GlobalModal';
import type { GlobalPostsType, Post } from '../typings/typings';

export const GlobalContext = React.createContext<GlobalPostsType>({
  searchInput: '',
  posts: [],
  activePost: null,
  isActive: false,
  likedPostsStorage: [],
  setSearchInput: () => { },
  setPosts: () => { },
  setActivePost: () => { },
  setIsActive: () => { },
  updateLikedPostsStorage: () => { },
  handleActivePost: () => { },
  session: null
});

export const GlobalPosts = ({ children }: { children: React.ReactNode }) => {
  const [searchInput, setSearchInput] = React.useState<string>('');
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [likedPostsStorage, setLikedPostsStorage] = React.useState<number[]>([]);
  const [activePost, setActivePost] = React.useState<Post | null>(null);
  const [isActive, setIsActive] = React.useState<boolean>(false);


  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session) })
    const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()

  }, [])

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
  }, [likedPosts])
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
      handleActivePost,
      session
    }}>
      <>
        {children}
        {/* {
          activePost &&
          <GlobalModal post={activePost} />
        } */}
      </>
    </GlobalContext.Provider>
  )
};