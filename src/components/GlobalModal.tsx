import React, { useContext } from 'react';
import Like from './Like.js';
import { useDate } from '../useDate.js';
import { GlobalContext } from './GlobalPosts.js';
import type { Post } from '../typings/typings.js';

const GlobalModal = ({ post }: { post: Post | null }) => {
  const date = useDate(post?.data)
  const { handleActivePost } = useContext(GlobalContext)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      handleActivePost(null)
    }
  };

  return post ? (
    <section
      className={`h-[100vh] w-full bg-shadow-750 fixed top-0 left-0 z-[1000] flex justify-center items-center`}
      onClick={handleClick}
    >
      <div className={`
        bg-darkgray-400 
        lg:h-[720px] 
        h-[520px]
        max-w-[1180px] 
        w-full 
        border-2 
        border-darkgray-200 
        rounded-lg 
        grid 
        lg:grid-cols-2 
        md:grid-cols[3fr_1fr]
        grid-cols-1
        lg:grid-rows[0.1fr_1fr_0.1fr] 
        md:grid-rows[0.5fr_6fr_1fr]
        grid-rows[1fr_0.2fr_1fr_0.2fr]
        mx-10`}>
        <img className={`
          row-start-1
          lg:row-end-3
          lg:w-full 
          lg:h-full 
          w-[50%]
          justify-self-center 
          self-center 
          bg-darkgray-450 
          border-r-2 
          border-darkgray-200
          `} src={post.imagem_capa}></img>
        <Like id={post.id} style={`
          lg:row-start-3 
          row-start-4
          lg:col-span-2 
          mx-5 
          cursor-pointer 
          lg:justify-self-center 
          lg:self-start
          justify-self-end
          self-start
          `} /><div className={`flex lg:col-start-2 col-span-full row-start-2`}>
          <h2 className={`
            font-[Space Grotesk, Helvetica] lg:text-2xl
            md:text-[14px] 
            font-medium 
            text-white 
            lg:mt-8 
            lg:mx-6
            col-span-full
            m-5
          `}>{post.titulo}</h2>
          <p className={`
            font-[Inter, Arial] 
            lg:text-base
            md:text-[14px]
            text-[12px] 
            font-medium 
            text-peach 
            mt-9 
            mx-6 
            w-[200px]
            `}>{date}</p>
        </div>
        <p className={`
          lg:col-start-2 
          col-span-full
          lg:row-start-2 
          row-start-3
          font-[Inter, Arial] 
          lg:text-xl 
          md:text-[16px]
          text-[14px]
          lg:mb-0
          mx-5 
          text-darkgray-100 
          overflow-y-scroll 
          lg:h-auto
          h-[150px]
          `}>{post.conteudo}</p>
      </div>
    </section>
  ) : <></>;
};

export default GlobalModal;
