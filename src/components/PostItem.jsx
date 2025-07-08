import React from 'react';
import PostModal from './PostModal';
import Like from './Like.jsx';
import styles from './css/PostItem.module.css';

const PostItem = ({ post }) => {
  const [highlight, setHighlight] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const postData = post;

  const activateModal = (event) => {
    setIsActive(true);
  };

  const deactivateModal = () => {
    setIsActive(false);
  };

  const extractDate = () => {
    const monthList = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];
    const day = post.data.slice(8, 10);
    const month = monthList[+post.data.slice(5, 7)];
    const year = post.data.slice(0, 4);
    const dateData = {
      day: day,
      month: month,
      year: year,
    };
    return dateData;
  };

  const extractedDate = extractDate();
  const extractedPreview = post.conteudo.slice(0, 80);

  return (
    <div className={styles.postContainer} key={post.index}>
      <div
        className={`${styles.postBox} ${highlight ? styles.highlighted : ''}`}
        onMouseEnter={() => setHighlight(true)}
        onMouseLeave={() => setHighlight(false)}
        onClick={activateModal}
      >
        <div className={styles.boxUpperPart}>
          <p className={styles.date}>
            {extractedDate.day} de {extractedDate.month}, {extractedDate.year}
          </p>
          <Like id={post.id} style={styles.likeButton}/>
        </div>
        <h2 className={styles.postTitle}>{post.titulo}</h2>
        <p className={styles.postPreview}>{extractedPreview}...</p>
      </div>
      <PostModal
        post={postData}
        isActive={isActive}
        close={deactivateModal}
        date={extractedDate}
      />
    </div>
  );
};
export default PostItem;
