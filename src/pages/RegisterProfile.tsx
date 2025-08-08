import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react";
import { supabase } from "@/utils/supabase";
import { useNavigate } from "react-router";
import { GlobalContext } from "@/components/GlobalPosts";

const RegisterProfile = () => {
  const [profilePictureFile, setProfilePictureFile] = React.useState<File | null>(null);

  const navigate = useNavigate();

  const profileSchema = z.object({
    name: z.string().nonempty('Seu nome não pode estar vazio.'),
  })

  type ProfileSchema = z.infer<typeof profileSchema>

  const { register, handleSubmit, formState: { errors }, } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema)
  })

  const { session } = React.useContext(GlobalContext)


  const handleProfile = async (data: ProfileSchema) => {
    if (!profilePictureFile) {
      alert("Por favor, selecione uma foto de perfil.");
      return;
    }

    try {
      const fileName = `${Date.now()}-${profilePictureFile?.name}`;

      const { data: publicUrlData } = supabase.storage
        .from('profile-pics')
        .getPublicUrl(fileName);

      const profilePictureUrl = publicUrlData.publicUrl;
      const userId = session?.user.id

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile-pics')
        .upload(fileName, profilePictureFile);

      if (uploadError) {
        throw uploadError;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .insert({
          username: data.name,
          avatar: profilePictureUrl
        })

      if (updateError) {
        throw updateError;
      }

      navigate('/')

    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      alert("Ocorreu um erro ao atualizar o perfil.");
    }
  }

  return (
    <div className='flex flex-col items-center mt-[220px] animate-zoomOutFadeIn'>
      <h2 className="text-white mb-2 text-3xl font-medium ">Você está quase lá!</h2>
      <h2 className="text-white mb-6 text-2xl font-medium ">Confirme seu email e preencha o seu perfil</h2>
      <Card className='w-[500px]'>
        <CardContent className="flex flex-col">
          <form onSubmit={handleSubmit(handleProfile)}>
            <Label className='mb-2' htmlFor="name">Nome</Label>
            <Input type='text' id='name' {...register("name")} />
            {errors.name && <p className="text-[12px] text-red-500 mt-1">{errors.name.message}</p>}
            <Label className='mb-2 mt-5' htmlFor="avatar">Foto de Perfil</Label>
            <Input
              type='file'
              id='avatar'
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setProfilePictureFile(e.target.files[0]);
                }
              }}
            />
            <Button type='submit' className='font-bold cursor-pointer mt-5 hover:bg-peach h-10 text-base'>Atualizar</Button>
          </form>
        </CardContent>
      </Card >
    </div>
  )
}

export default RegisterProfile