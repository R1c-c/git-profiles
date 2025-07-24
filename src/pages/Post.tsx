import { useParams } from 'react-router';

import type { Post } from '@/typings/typings';
import { useContext, useMemo } from 'react';
import { GlobalContext } from '@/components/GlobalPosts';
import Header from '@/components/Header';

const Post = () => {
  const params = useParams();
  console.log('post params: ', params)

  const { posts } = useContext(GlobalContext)

  const post = useMemo(() => posts.find(p => p.id === Number(params.id)), [params.id, posts])

  if (!post) {
    return <>Post não encontrado</>
  }

  return (
    <>
      <Header />
      <section>
        <p>{post?.data}</p>
        <p>{post?.titulo}</p>
        <p>{post?.imagem_capa}</p>
        <p>{post?.conteudo}</p>
      </section>
    </>
  )
}

export default Post