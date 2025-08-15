import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar';
import React from 'react';
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
      <div className='relative z-10'>
        <Header />
      </div>
      <div className='animate-slideDown z-0'>
        <SearchBar />
        <Outlet />
      </div>
    </>
  )
}

export default Layout