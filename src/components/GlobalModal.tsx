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
      className={styles.modalContainer}
      onClick={handleClick}
    >
      <div className={styles.modal}>
        <img className={styles.thumbnail} src={post.imagem_capa}></img>
        <Like id={post.id} style={styles.likeButton} />
        <div className={styles.boxUpperPart}>
          <h2 className={styles.title}>{post.titulo}</h2>
          <p className={styles.date}>
            {date}
          </p>
        </div>
        <p className={styles.content}>{post.conteudo}</p>
      </div>
    </section>
  ) : <></>;
};

export default GlobalModal;
