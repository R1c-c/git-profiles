import React from 'react';
import Like from './Like.js';
import styles from './css/PostItem.module.css';
import { GlobalContext } from './GlobalPosts.js';
import { useDate } from '../useDate.js';
import type { Post } from '../typings/typings.js';

const PostItem = ({ post }: { post: Post }) => {
  const [highlight, setHighlight] = React.useState(false);
  const { handleActivePost } = React.useContext(GlobalContext);
  const extractedPreview = post.conteudo.slice(0, 80);
  const data = useDate(post.data)

  return (
    <div
      className={`
        bg-darkgray-400 
        w-full 
        max-w-[1216px] 
        h-auto 
        border-2 
        border-darkgray-200 
        rounded-[8px] 
        my-5 
        mx-auto 
        ${highlight ? 'border-peach' : ''}
        `}
      onMouseEnter={() => setHighlight(true)}
      onMouseLeave={() => setHighlight(false)}
      onClick={() => { handleActivePost(post) }}
    >
      <div className={`grid grid-cols-2 w-auto mt-10 mx-10 mb-[30px]`}>
        <p className={`
          block
          font-[Inter, Arial]
          text-base
          font-medium
          m-0
          text-peach
          justify-self-start
          self-end
          `}>
          {data}
        </p>
        <Like id={post.id} style={'block text-white m-0 place-self-end cursor-pointer'} />
      </div>
      <h2 className={`
        font-[Space Grotesk, Helvetica] 
        text-2xl 
        font-medium 
        my-5 
        mx-10 
        text-white
        `}>{post.titulo}</h2>
      <p className={`
        font-[Inter, Arial] 
        text-xl 
        font-medium 
        leading-[160%]
        mt-5
        mx-10
        mb-10
        text-darkgray-100
        `}>{extractedPreview}...</p>
    </div>
  );
};
export default PostItem;
