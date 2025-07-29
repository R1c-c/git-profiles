import React from 'react'
import { supabase } from '../utils/supabase';

const PostForm = () => {
  const [title, setTitle] = React.useState<string>('');
  const [img, setImg] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  const handlePost = async (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.from('posts').insert({ titulo: title, imagem_capa: img, conteudo: content })
      if (error) throw error
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`flex justify-center mt-20`}>
      <div className={`
        flex 
        flex-col 
        w-[520px] 
        text-white 
        font-medium 
        bg-darkgray-300 
        p-10 
        border-2 
        border-darkgray-200 
        rounded-[5px] 
        gap-2.5
        animate-slideIn
        `}>
        Titulo
        <input className={`mb-5 bg-white`} type="text" onChange={({ target }) => { setTitle(target.value) }} />
        {`Imagem de capa (insira um link válido)`}
        <input className={`mb-5 bg-white`} type="text" onChange={({ target }) => { setImg(target.value) }} />
        Conteúdo
        <textarea className={`mb-5 bg-white h-28`} onChange={({ target }) => { setContent(target.value) }} />

        <button className={`mt-2.5 
          text-black
          font-medium 
          text-base 
          bg-darkgray-100
          py-[15px] 
          px-[30px] 
          rounded-[5px] 
          self-end 
          cursor-pointer
          `} onClick={handlePost} disabled={loading}>Publicar</button>
        <>{error && `Um erro ocorreu: ${error}`}</>
      </div>
    </div>
  )
}

export default PostForm