import React from 'react'
import GlobalModal from './GlobalModal';

export const GlobalContext = React.createContext(); 
/* Cria o contexto Global Context */

export const GlobalPosts = ({ children }) => {
  const likedPostsStorage = window.localStorage.getItem('likedPostsStorage');
  /* Cria uma variavel likePostsStorage que guarda uma array com os ids dos posts curtidos */

  const [searchInput, setSearchInput] = React.useState('');
  const [isActive, setIsActive] = React.useState(false);
  const [activePost, setActivePost] = React.useState(null)

  const [likedPosts, setLikedPosts] = React.useState([]);
  /* Cria um estado reativo para os posts curtidos na variavel likedPosts */

  async function fetchPost(url) {
    try {
      const postsResponse = await fetch(url);

      if (!postsResponse.ok) {
        console.error('Houve um erro durante a requisição.', postsResponse.statusText)
      }

      const postsJSON = await postsResponse.json();
      return postsJSON;
    } catch (e) {
      throw new Error(e.message)
    }
  }

  const activateModal = (event) => {
    setIsActive(true);
  };

  const deactivateModal = () => {
    setIsActive(false);
  };

  const handleActivePost = (post) => {
    setActivePost(post)
  }

  React.useEffect(() => {
      if (!likedPostsStorage) return;
      setLikedPosts(JSON.parse(likedPostsStorage));
    }, [])
    /* Usa um useEffect que é ativado toda vez que esse código se repete */
    /* Checa se likedPostsStorage é uma lista vazia*/
    /* Se sim, não faz nada. Se não, transforma likedPostsStorage em um objeto e o guarda em likedPosts */

    const updateLikedPosts = (newList) => {
      setLikedPosts(newList);
      window.localStorage.setItem('likedPostsStorage', JSON.stringify(newList))
    }
    /* Uma função chamada updateLikedPosts que leva como newList como parâmetro */
    /* Ela define likedPosts como o conteúdo de Newlist e sobrescreve o que estiver no item do localStorage 'likedPostsStorage' com o conteúdo da NewList transformada em String*/

  return (
    <GlobalContext.Provider value={{
      likedPosts, 
      updateLikedPosts, 
      fetchPost, 
      searchInput, 
      setSearchInput, 
      isActive, 
      setIsActive, 
      activateModal, 
      deactivateModal,
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