import { useParams } from 'react-router';

import type { Post } from '@/typings/typings';
import React, { useContext, useMemo } from 'react';
import { GlobalContext } from '@/components/GlobalPosts';
import Header from '@/components/Header';
import { useDate } from '@/useDate';
import { Button } from '@/components/ui/button';

const Post = () => {
  const [commentInput, setCommentInput] = React.useState<string>('')

  const params = useParams();

  const { posts } = useContext(GlobalContext)

  const post = useMemo(() => posts.find(p => p.id === Number(params.id)), [params.id, posts])

  const date = useDate(post?.data);

  const handleComment = async (e: React.MouseEvent) => {
    e.preventDefault();

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
        <div className='flex justify-center mt-5'>
          <div className='relative w-[720px]'>
            <textarea className='w-full bg-white resize-none p-2' rows={4} onChange={(event) => setCommentInput(event.target.value)} />
            <Button className='bg-peach hover:bg-red-300 cursor-pointer absolute top-17 right-2'>Comentar</Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Post