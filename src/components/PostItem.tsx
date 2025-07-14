import React from 'react';
// import PostModal from './PostModal';
import Like from './Like.js';
import styles from './css/PostItem.module.css';
import { GlobalContext } from './GlobalPosts.js';
import { useDate } from '../useDate.js';

const PostItem = ({ post }) => {
  const [highlight, setHighlight] = React.useState(false);
  const {handleActivePost} = React.useContext(GlobalContext);
  const extractedPreview = post.conteudo.slice(0, 80);
  const data = useDate(post.data)

  return (
      <div
        className={`${styles.postBox} ${highlight ? styles.highlighted : ''}`}
        onMouseEnter={() => setHighlight(true)}
        onMouseLeave={() => setHighlight(false)}
        onClick={() => {handleActivePost(post)}}
      >
        <div className={styles.boxUpperPart}>
          <p className={styles.date}>
            {data}
          </p>
          <Like id={post.id} style={styles.likeButton}/>
        </div>
        <h2 className={styles.postTitle}>{post.titulo}</h2>
        <p className={styles.postPreview}>{extractedPreview}...</p>
      </div>
  );
};
export default PostItem;
