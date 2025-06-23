import React from 'react'
import styles from './PostOnPage.module.css'
import PostModal from './PostModal';

const PostItem = ({post}) => {
  const [highlight, setHighlight] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const postData = post

  const activateModal = () => {
    setIsActive(true);
  }

  const deactivateModal = () => {
    setIsActive(false);
  }

    return (
      <div className={styles.postContainer} key={post.index}>
        <div className={`${styles.postBox} ${highlight ? styles.highlighted: ''}`} onMouseEnter={() => setHighlight(true)}
        onMouseLeave={() => setHighlight(false)} onClick={activateModal}>
          <div className={styles.boxUpperPart}>
            <p className={styles.date}>{post.data}</p>
            <p className={styles.likeButton}>like</p>
          </div>  
          <h2 className={styles.postTitle}>{post.titulo}</h2>
          <p className={styles.postPreview}>{post.conteudo}</p>
        </div>
        <PostModal post={postData} isActive={isActive} close={deactivateModal}/>
      </div>
    );
  }
export default PostItem
