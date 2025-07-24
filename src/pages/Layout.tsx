import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar';
import React from 'react';
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
      <Header />
      <SearchBar />
      <Outlet />
    </>
  )
}

export default Layout