import { useParams } from 'react-router';

import type { Comments, Post } from '@/typings/typings';
import React, { useContext, useMemo } from 'react';
import { GlobalContext } from '@/components/GlobalPosts';
import Header from '@/components/Header';
import { formatDate } from '@/formatDate';
import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabase';

const Post = () => {
  const [commentInput, setCommentInput] = React.useState<string>('')
  const [comments, setComments] = React.useState<Comments[]>([])
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  const params = useParams();
  const { posts } = useContext(GlobalContext)
  const post = useMemo(() => posts.find(p => p.id === Number(params.id)), [params.id, posts])
  const date = formatDate(post?.data);

  const getComments = React.useCallback(async (postId: number) => {
    try {
      const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post', postId)
        .order('data', { ascending: true });
      if (error) {
        console.error('Erro ao buscar comentários:', error.message);
        setError('Erro ao carregar comentários.');
        return;
      }
      setComments(comments || []);
    } catch (error) {
      console.error('Erro inesperado ao buscar comentários:', error);
    }
  }, []);

  React.useEffect(() => {
    if (post) {
      getComments(post.id);
    }
  }, [post, getComments]);


  const handleComment = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true); // Inicia o loading ao postar
    setError(null); // Limpa o erro ao tentar de novo

    const user = (await supabase.auth.getUser()).data.user?.email;

    if (!user) {
      setError('Você precisa estar logado para comentar.');
      setLoading(false);
      return;
    }

    if (!commentInput.trim()) { // Validação simples para comentário vazio
      setError('O comentário não pode estar vazio.');
      setLoading(false);
      return;
    }

    if (!post?.id) { // Garante que temos o ID do post
      setError('ID do post não encontrado.');
      setLoading(false);
      return;
    }

    try {
      const { error: insertError } = await supabase.from('comments').insert({
        comentário: commentInput,
        autor: user,
        post: post.id,
      });

      if (insertError) {
        console.error('Erro ao inserir comentário:', insertError.message);
        // O erro 23503 é para violação de chave estrangeira
        if (insertError.code === '23503') {
          setError('Post inválido ou dados do autor.');
        } else if (insertError.code === '23502') { // erro de not null
          setError('Campos obrigatórios faltando.');
        } else {
          setError(insertError.message);
        }
        throw insertError;
      }

      setCommentInput('');

      await getComments(post.id);
    } catch (error: unknown) {
      console.error('Erro geral em handleComment:', error);
      if (!error) setError('Um erro desconhecido ocorreu.');
    } finally {
      setLoading(false);
    }
  }

  if (!post) {
    return <>Post não encontrado</>
  }

  return (
    <>
      <Header />
      <section>
        <div className='w-full flex justify-center text-white mt-20 animate-slideIn '>
          <div className='w-full max-w-[1280px] grid grid-cols-2 grid-rows-auto bg-darkgray-300'>
            <img src={post?.imagem_capa} className='self-center w-full row-start-1 '></img>
            <div>
              <div className='flex ml-5 mt-5'>
                <h1 className='font-medium text-xl mb-5'>{post?.titulo}</h1>
                <p className='text-peach font-medium'>{date}</p>
              </div>
              <p className='h-[550px] ml-5 col-2 whitespace-pre-wrap overflow-y-scroll'>{post?.conteudo.replace(/\\n/g, '\n')}</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='flex justify-center'>
          <div className='flex flex-col items-center mt-5 w-[1280px]'>
            <div className='relative w-[720px]'>
              <textarea className='w-full bg-white resize-none p-2' rows={4} value={commentInput} onChange={(event) => setCommentInput(event.target.value)} />
              <Button disabled={loading} className='bg-peach hover:bg-red-300 cursor-pointer absolute top-17 right-2' onClick={handleComment}>Comentar</Button>
            </div>
            {error && <p className='text-sm text-red-500 mt-2'>{error}</p>}

            {comments.length !== 0 ?
              <div className='flex flex-col mt-5 w-[720px]'>
                {comments.map((comment) => {
                  return (
                    <div key={comment.id} className='bg-darkgray-200 text-white mb-4 p-4'>
                      <div className='flex mb-4 place-content-between'>
                        <p>{comment.autor}</p>
                        <p>{formatDate(comment.data)}</p>
                      </div>
                      <p>{comment.comentário}</p>
                    </div>
                  )
                })}
              </div> :
              <div className='text-darkgray-100 font-medium my-20 text-lg'>
                <p>Não há comentários.</p>
              </div>
            }

          </div>
        </div>
      </section>
    </>
  )
}

export default Post