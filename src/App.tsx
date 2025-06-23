import React from 'react'
import Header from './components/Header.tsx'
import PostOnPage from './components/PostOnPage.tsx'
import './App.css'


const App = () => {
  const [searchInput, setSearchInput] = React.useState('');

  return (
  <div>
    <Header searchInput={searchInput} setSearchInput={setSearchInput}/>
    <section className='posts'>
      <PostOnPage searchInput={searchInput}/>
    </section>
  </div>
  )
}

export default App
