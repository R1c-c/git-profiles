import React from "react";
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
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"



const Register = () => {
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const navigate = useNavigate();

  const registerSchema = z.object({
    username: z.string().min(4, { message: "Nomes precisam de pelo menos 4 caracteres" }).max(20, { message: "Nomes não podem ter mais do que 20 caracteres" }),
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
      const { data: userAuthData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (signUpError) throw signUpError;

      if (userAuthData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: userAuthData.user.id,
              username: data.username,
            },
          ]);

        if (profileError) throw profileError;

        setSuccess(true);
        alert('Cadastro realizado com sucesso! Você será redirecionado.');
        window.location.href = '/';
      } else if (userAuthData.session === null && userAuthData.user === null) {
        alert('Cadastro realizado! Por favor, verifique seu e-mail para confirmar a conta.');
        setSuccess(true);
      }

    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

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
            <Label className='mb-2' htmlFor="name">Nome de usuário</Label>
            <Input type='text' id='name' {...register('username')} />
            {errors.username && <p className="text-[12px] text-red-500 mt-1">{errors.username.message}</p>}
            <Label className='mb-2 mt-5' htmlFor="email">Endereço de E-mail</Label>
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