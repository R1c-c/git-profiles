import React from "react";
import PostItem from './PostItem';
import { GlobalContext } from "./GlobalPosts";
import HeartFilled from "../Icons/HeartFilled";
import HeartUnfilled from "../Icons/HeartUnfilled";

const Like = ({id, style}) => {
  const {likedPosts, updateLikedPosts} = React.useContext(GlobalContext);
  /* Puxa likedPosts e updateLikedPosts do GlobalContext */
  const [isLiked, setIsLiked] = React.useState(false);
  /* Define um estado reativo na variável isLiked */

  React.useEffect(() => {
    const liked = likedPosts.find((item) => item === id);
    if (liked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedPosts])
  /* Usa um useEffect toda vez que likedPosts mudar*/
  /* Guarda em liked o id de um post CASO ele seja encontrado na lista likedPosts*/
  /* Se estiver na lista, define isLiked como verdadeiro, se não, define como falso */

  const handleClick = (event) => {
    event.stopPropagation();
    const newList = isLiked ? likedPosts.filter((item) => item !== id) : [...likedPosts, id];
    /* Guarda na variavel newList o seguinte: */
    /* Se isLiked for verdadeiro, retorna uma lista filtrada de likedPosts com só os posts diferentes do que foi clicado para remove-lo de lá */
    /* Se isLiked for falso, retorna likedPosts com o post atual adicionado */

    updateLikedPosts(newList)
    /* Guarda newList no localStorage */
  }

  return (
    <button className={style} onClick={handleClick}>
      {isLiked ? <HeartFilled /> : <HeartUnfilled />}
    </button>
  )
}

export default Like;