import React from 'react'
import { GlobalContext } from './GlobalPosts.js';
import Header from './Header.js';
import PostOnPage from './PostOnPage.js';

const Favorite = () => {
  const {searchInput, setSearchInput} = React.useContext(GlobalContext);
  return (
    <div>          
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <section className="posts">
        <PostOnPage favorites={true}/>
      </section>
    </div>
  )
}

export default Favorite