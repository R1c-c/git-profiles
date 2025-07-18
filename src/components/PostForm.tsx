import React from 'react'
import styles from './css/PostForm.module.css'
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
    <div className={styles.formWrapper}>
      <div className={styles.form}>
        Titulo
        <input type="text" onChange={({ target }) => { setTitle(target.value) }} />
        {`Imagem de capa (insira um link válido)`}
        <input type="text" onChange={({ target }) => { setImg(target.value) }} />
        Conteúdo
        <textarea onChange={({ target }) => { setContent(target.value) }} />

        <button onClick={handlePost} disabled={loading}>Publicar</button>
        <>{error && `Um erro ocorreu: ${error}`}</>
      </div>
    </div>
  )
}

export default PostForm