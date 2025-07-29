import { useState } from "react";
import { supabase } from "../utils/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"



const Register = () => {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const registerSchema = z.object({
    email: z.string().email('Formato de e-mail inválido.').nonempty('E-mail é obrigatório.'),
    password: z.string().min(6, {
      message: "Senhas precisam de, no mínimo, 6 dígitos.",
    }),
  })

  type RegisterSchema = z.infer<typeof registerSchema>

  const { register, handleSubmit, formState: { errors }, } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })

  const handleRegister = async (data: RegisterSchema) => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
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

  return (
    <div className='flex justify-center mt-[220px]'>
      <Card className='w-[500px] animate-slideIn'>
        <CardAction className="self-end mr-8">
          <NavLink to='/login'>
            <Button className='cursor-pointer'>Voltar</Button>
          </NavLink>
        </CardAction>
        <CardHeader>
          <CardTitle className="text-2xl">Cadastre-se</CardTitle>
          <CardDescription>Crie uma conta para acessar o blog</CardDescription>
        </CardHeader>
        <CardContent>

          <form onSubmit={handleSubmit(handleRegister)}>
            <Label className='mb-2' htmlFor="email">Endereço de E-mail</Label>
            <Input type='email' id='email' {...register('email')} placeholder='example@email.com' />
            {errors.email && <p className="text-[12px] text-red-500 mt-1">{errors.email.message}</p>}
            <Label className='mb-2 mt-5' htmlFor="password">Senha</Label>
            <Input type='password' id='password' {...register('password')} />
            {errors.password && <p className="text-[12px] text-red-500 mt-1">{errors.password.message}</p>}
            <Button type='submit' disabled={loading} className='font-bold cursor-pointer mt-5'>Cadastrar</Button>
          </form>

        </CardContent>
        {
          error && <p className="text-[12px] ml-7 text-red-500">{error}</p>
        }
        {
          success && <p className="text-[12px] ml-7 text-green-500">{success}</p>
        }
      </Card >
    </div>
  );
};

export default Register