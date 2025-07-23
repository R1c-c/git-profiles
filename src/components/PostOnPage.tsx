import React from 'react';
import { GlobalContext } from './GlobalPosts.js';
import PostItem from './PostItem.js';


const PostOnPage = ({ favorites }: { favorites?: boolean }) => {
  const { posts, searchInput, likedPostsStorage } = React.useContext(GlobalContext)


  if (favorites) {
    const favPosts = posts.filter((post) => {
      return likedPostsStorage.includes(post.id);
    })
    const favPostsOnScreen = favPosts.filter((post) => {
      return post.titulo.toLowerCase().includes(searchInput.toLowerCase()) || post.conteudo.toLowerCase().includes(searchInput.toLowerCase())
    })
    if (favPostsOnScreen.length !== 0) {
      if (favPosts.length !== 0) {
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
    const postsOnScreen = posts.filter((post) => {
      return post.titulo.toLowerCase().includes(searchInput.toLowerCase()) || post.conteudo.toLowerCase().includes(searchInput.toLowerCase())
    })

    if (postsOnScreen.length !== 0) {
      return postsOnScreen.map((post, index) =>
        <PostItem key={index} post={post} />
      );
    } else {
      return <p className={`text-darkgray-100 text-[18px]`}>Não há posts disponíveis</p>
    }
  }
};

export default PostOnPage;
