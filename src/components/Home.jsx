import React from 'react'
import { GlobalContext } from './GlobalPosts.jsx';
import Header from './Header.jsx';
import PostOnPage from './PostOnPage.jsx';

const Home = () => {
  const {searchInput, setSearchInput} = React.useContext(GlobalContext);
  return (
    <div>          
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <section className="posts">
        <PostOnPage searchInput={searchInput} />
      </section>
    </div>
  )
}

export default Home