import React, { useContext } from 'react';
import styles from './css/PostModal.module.css';
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
        h-[720px] 
        max-w-[1180px] 
        w-full 
        border-2 
        border-darkgray-200 
        rounded-lg 
        grid 
        grid-cols-2 
        grid-rows[0.1fr_1fr_0.1fr] 
        mx-10`}>
        <img className={`
          row-start-1
          row-end-3
          w-full h-full 
          justify-self-center 
          self-center 
          bg-darkgray-450 
          border-r-2 
          border-darkgray-200
          `} src={post.imagem_capa}></img>
        <Like id={post.id} style={`row-start-3 col-span-2 mx-5 cursor-pointer justify-self-center self-start`} />
        <div className={`flex col-start-2`}>
          <h2 className={` font-[Space Grotesk, Helvetica] text-2xl font-medium text-white mt-8 mx-6`}>{post.titulo}</h2>
          <p className={`font-[Inter, Arial] text-base font-medium text-peach mt-9 mx-6 w-[200px]`}>
            {date}
          </p>
        </div>
        <p className={`col-start-2 row-start-2 font-[Inter, Arial] text-xl mb-0 text-darkgray-100 overflow-y-scroll h-auto`}>{post.conteudo}</p>
      </div>
    </section>
  ) : <></>;
};

export default GlobalModal;
