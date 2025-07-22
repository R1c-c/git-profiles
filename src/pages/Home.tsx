import React from 'react'
import { GlobalContext } from '../components/GlobalPosts.js';
import Header from '../components/Header.js';
import PostOnPage from '../components/PostOnPage.js';

const Home = () => {
  const { searchInput, setSearchInput } = React.useContext(GlobalContext);
  return (
    <div>
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <section className={`mb-20 px-4`}>
        <PostOnPage />
      </section>
    </div>
  )
}

export default Home