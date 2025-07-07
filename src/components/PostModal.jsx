import React from 'react';
import styles from './css/PostModal.module.css';
import Like from './Like.jsx';

const PostModal = ({ post, isActive, close, date }) => {
  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  return (
    <section
      className={`${isActive ? styles.modalContainer : styles.inactive}`}
      onClick={handleClick}
    >
      <div className={styles.modal}>
        <img className={styles.thumbnail} src={post.imagem_capa}></img>
        <Like id={post.id} style={styles.likeButton}/>
        <div className={styles.boxUpperPart}>
          <h2 className={styles.title}>{post.titulo}</h2>
          <p className={styles.date}>
            {date.day} de {date.month}, {date.year}
          </p>
        </div>
        <p className={styles.content}>{post.conteudo}</p>
      </div>
    </section>
  );
};

export default PostModal;
