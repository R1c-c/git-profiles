import React from 'react'
import { supabase } from '../utils/supabase'
import { useNavigate } from 'react-router'

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <button onClick={handleLogout} className={`text-peach cursor-pointer`}>Logout</button>
  )
}

export default Logout