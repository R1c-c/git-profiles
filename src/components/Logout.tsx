import React from 'react'
import { supabase } from '../utils/supabase'

const Logout = () => {

  const handleLogout = () => {
    supabase.auth.signOut()
  }

  return (
    <button onClick={handleLogout} className={`text-peach cursor-pointer`}>Logout</button>
  )
}

export default Logout