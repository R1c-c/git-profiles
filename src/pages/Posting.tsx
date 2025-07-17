import React from 'react';
import { GlobalContext } from "../components/GlobalPosts";
import Header from "../components/Header"
import PostForm from '../components/PostForm';

const Posting = () => {
  const {searchInput, setSearchInput} = React.useContext(GlobalContext);

  return (
    <section>
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <PostForm />
    </section>
  )
}

export default Posting