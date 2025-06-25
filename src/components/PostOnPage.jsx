import React from 'react';
import PostItem from './PostItem';

async function fetchPost(url) {
  const postsResponse = await fetch(url);
  const postsJSON = await postsResponse.json();
  return postsJSON;
}

const PostOnPage = ({ searchInput }) => {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPost('./posts/posts.json');
      setPosts(fetchedPosts);
    };
    getPosts();
  }),
    [];

  return posts.map((post, index) =>
    post.titulo.toLowerCase().includes(searchInput.toLowerCase()) ||
    post.conteudo.toLowerCase().includes(searchInput.toLowerCase()) ? (
      <PostItem key={index} post={post} />
    ) : null,
  );
};

export default PostOnPage;
