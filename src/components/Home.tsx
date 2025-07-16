import React from 'react'
import { GlobalContext } from './GlobalPosts.js';
import Header from './Header.js';
import PostOnPage from './PostOnPage.js';

const Home = () => {
  const {searchInput, setSearchInput} = React.useContext(GlobalContext);
  return (
    <div>          
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <section className="posts">
        <PostOnPage/>
      </section>
    </div>
  )
}

export default Home