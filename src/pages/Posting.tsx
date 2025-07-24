import React from 'react';
import { GlobalContext } from "../components/GlobalPosts";
import Header from "../components/Header"
import PostForm from '../components/PostForm';

const Posting = () => {
  return (
    <section>
      <Header />
      <PostForm />
    </section>
  )
}

export default Posting