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
    if (favPosts.length !== 0) {
      if (favPostsOnScreen.length !== 0) {
        return favPosts.map((post, index) =>
          post.titulo.toLowerCase().includes(searchInput.toLowerCase()) ||
            post.conteudo.toLowerCase().includes(searchInput.toLowerCase()) ? (
            <PostItem key={index} post={post} />
          ) : null,
        );
      } else {
        return <div className={`flex w-full items-center justify-center`}><p className={`text-darkgray-100 text-[18px]`}>{`Não há posts nesta lista que contenham: "${searchInput}"`}</p></div>
      }
    } else {
      return <div className={`flex w-full items-center justify-center`}><p className={`text-darkgray-100 text-[18px]`}>Sua lista de favoritos está vazia</p></div>
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
      return <div className={`flex w-full items-center justify-center`}><p className={`text-darkgray-100 text-[18px]`}>{`Não há posts disponíveis que contenham: "${searchInput}"`}</p></div>
    }
  }
};

export default PostOnPage;
