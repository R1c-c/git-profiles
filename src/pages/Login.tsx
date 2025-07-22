import { useState } from "react"
import { supabase } from "../utils/supabase"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NavLink } from "react-router-dom"



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
    <div className='flex justify-center mt-[220px]'>
      <Card className='w-[500px] animate-slideIn'>
        <CardAction className="self-end mr-8">
          <NavLink to='/'>
            <Button className='cursor-pointer'>Voltar</Button>
          </NavLink>
        </CardAction>
        <CardHeader>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>Realize o login ou se cadastre para acessar o blog</CardDescription>
        </CardHeader>
        <CardContent>
          <Label className='mb-2' htmlFor="email">Endereço de E-mail</Label>
          <Input type='email' id='email' placeholder='example@email.com' onChange={({ target }) => { setEmail(target.value) }} />
          <Label className='mb-2 mt-5' htmlFor="password">Senha</Label>
          <Input type='password' id='password' onChange={({ target }) => { setPassword(target.value) }} />
        </CardContent>
        <CardFooter>
          <Button type='submit' onClick={handleLogin} disabled={loading} className='font-bold cursor-pointer'>Entrar</Button>
          <Button type='submit' onClick={handleRegister} disabled={loading} variant='outline' className="mx-4 cursor-pointer">Cadastrar</Button>
        </CardFooter>
        {
          error && <p className="ml-7 text-red-500">{error}</p>
        }
        {
          success && <p className="ml-7 text-green-500">{success}</p>
        }
      </Card >
    </div>
  );
};

export default Login