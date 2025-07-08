import React from 'react';
import { GlobalContext } from './GlobalPosts.jsx';
import PostItem from './PostItem';
import styles from './css/PostOnPage.module.css';


const PostOnPage = ({ searchInput, favorites }) => {
  const [posts, setPosts] = React.useState([]);
  const {fetchPost, likedPosts} = React.useContext(GlobalContext)

  React.useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPost('./posts/posts.json');
      setPosts(fetchedPosts);
    };
    getPosts();
  }, [])

  if(favorites){
    const favPosts = posts.filter((post, index) => {
      return likedPosts.includes(index+1);
    })

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
    const postsOnScreen = posts.filter((post) => {
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
