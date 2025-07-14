import React, { useContext } from 'react';
import styles from './css/PostModal.module.css';
import Like from './Like.jsx';
import { useDate } from '../useDate.jsx';
import { GlobalContext } from './GlobalPosts.jsx';

const GlobalModal = ({ post }) => {
  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      handleActivePost(null)
    }
  };

  const {handleActivePost} = useContext(GlobalContext)

  const date = useDate(post.data)

  return post ? (
    <section
      className={styles.modalContainer}
      onClick={handleClick}
    >
      <div className={styles.modal}>
        <img className={styles.thumbnail} src={post.imagem_capa}></img>
        <Like id={post.id} style={styles.likeButton}/>
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
