import React from 'react';
import { GlobalContext } from './GlobalPosts.jsx';
import PostItem from './PostItem';
import styles from './css/PostOnPage.module.css';


const PostOnPage = ({ searchInput, favorites }) => {
  const [posts, setPosts] = React.useState([]);
  const {postsStorage, likedPosts} = React.useContext(GlobalContext)


  if(favorites){
    const favPosts = postsStorage.filter((post, index) => {
      return likedPosts.includes(index);
    })
    const favPostsOnScreen = favPosts.filter((post) => {
      return post.titulo.toLowerCase().includes(searchInput.toLowerCase()) || post.conteudo.toLowerCase().includes(searchInput.toLowerCase()) 
    })
    if(favPostsOnScreen.length !== 0) {
      if(favPosts.length !== 0){
        return favPosts.map((post, index) =>
          post.titulo.toLowerCase().includes(searchInput.toLowerCase()) ||
          post.conteudo.toLowerCase().includes(searchInput.toLowerCase()) ? (
            <PostItem key={index} post={post} />
          ) : null,
        );
      } else {
        return <p>Sua lista de favoritos está vazia</p>
      } 
    } else {
      return <p>Não há posts disponíveis</p>
    }

  } else {
    const postsOnScreen = postsStorage.filter((post) => {
      return post.titulo.toLowerCase().includes(searchInput.toLowerCase()) || post.conteudo.toLowerCase().includes(searchInput.toLowerCase()) 
    })

    if(postsOnScreen.length !== 0){
      return postsOnScreen.map((post, index) =>
          <PostItem key={index} post={post} />
      );
    } else {
      return <p>Não há posts disponíveis</p>
    }
  }
};

export default PostOnPage;
