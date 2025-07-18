import React from 'react'
import { supabase } from '../utils/supabase'

const Logout = () => {

  const handleLogout = () => {
    supabase.auth.signOut()
  }

  return (
    <button onClick={handleLogout} style={{ color: '#E07B67', fontWeight: '500', fontSize: '16px', cursor: 'pointer' }}>Logout</button>
  )
}

export default Logout