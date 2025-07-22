import React from 'react'
import { supabase } from '../utils/supabase'

const Logout = () => {

  const handleLogout = () => {
    supabase.auth.signOut()
  }

  return (
    <button onClick={handleLogout} style={{ color: '#e07b67' }} className={`text-peach, font-medium text-base cursor-pointer`}>Logout</button>
  )
}

export default Logout