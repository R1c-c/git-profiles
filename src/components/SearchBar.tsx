import React from 'react'
import { Input } from './ui/input'
import { GlobalContext } from './GlobalPosts';

const SearchBar = () => {

  const { searchInput, setSearchInput } = React.useContext(GlobalContext);

  return (
    <div className={`flex w-full h-20 bg-darkgray-400 justify-center px-4`}>
      <Input
        className={`
              max-w-[1216px] 
              font-[Inter, Arial] 
              font-medium 
              text-white
              h-10 
              bg-darkgray-300 
              border-darkgray-200 
              rounded-[6px] 
              px-[30px] 
              grow 
              box-border
              `}
        placeholder="Pesquisar no blog"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
    </div>
  )
}

export default SearchBar