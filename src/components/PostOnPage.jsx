import React from 'react';
import PostItem from './PostItem';

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

const PostOnPage = ({ searchInput }) => {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPost('./posts/posts.json');
      setPosts(fetchedPosts);
    };
    getPosts();
  }, [])

  return posts.map((post, index) =>
    post.titulo.toLowerCase().includes(searchInput.toLowerCase()) ||
    post.conteudo.toLowerCase().includes(searchInput.toLowerCase()) ? (
      <PostItem key={index} post={post} />
    ) : null,
  );
};

export default PostOnPage;
