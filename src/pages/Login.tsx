import { useState } from "react"
import { supabase } from "../utils/supabase"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.MouseEvent) => {
     e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      // Update this route to redirect to an authenticated route. The user already has an active session.
      location.href = '/'
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    setLoading(true)

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      })
      
      console.log('register data: ', data)

      if (error) throw error
      setSuccess(true)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{background: "#fff", padding: "20px", display: "flex", flexDirection: "column", gap: "16px"}}>
      Login
      <div>
        <input type="email" onChange={({target}) => {setEmail(target.value)}} />
      </div>
      <div>
        <input type="password" onChange={({target}) => {setPassword(target.value)}} />
      </div>
      <button onClick={handleLogin} disabled={loading}>
        Entrar
      </button>
      <button onClick={handleRegister} disabled={loading}>
        Cadastrar
      </button>
      {
        error && <p>{error}</p>
      }
      {
        success && <p>{success}</p>
      }
    </div>
  )
}

export default Login