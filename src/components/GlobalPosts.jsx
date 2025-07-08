import React from 'react'

export const GlobalContext = React.createContext(); 
/* Cria o contexto Global Context */
export const GlobalPosts = ({ children }) => {
/* Cria uma função chamada Global Posts que leva {children} como parâmetro */
  const likedPostsStorage = window.localStorage.getItem('likedPostsStorage');
  /* Cria uma variavel likePostsStorage que guarda uma array com os ids dos posts curtidos */
  const [likedPosts, setLikedPosts] = React.useState([]);
  /* Cria um estado reativo para os posts curtidos na variavel likedPosts */
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
    <GlobalContext.Provider value={{likedPosts, updateLikedPosts}}>
      {children}
    </GlobalContext.Provider>
  )
};