import React from "react";
import { GlobalContext } from "./GlobalPosts";
import HeartFilled from "../Icons/HeartFilled";
import HeartUnfilled from "../Icons/HeartUnfilled";

const Like = ({ id, style }: { id: number, style: string }) => {
  const { likedPostsStorage, updateLikedPostsStorage } = React.useContext(GlobalContext);
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    const liked = likedPostsStorage.find((item) => item === id);
    if (liked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [id, likedPostsStorage])
  /* Usa um useEffect toda vez que likedPostsStorage mudar*/
  /* Guarda em liked o id de um post CASO ele seja encontrado na lista likedPostsStorage*/
  /* Se estiver na lista, define isLiked como verdadeiro, se não, define como falso */

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const newList = isLiked ? likedPostsStorage.filter((item) => item !== id) : [...likedPostsStorage, id];
    /* Guarda na variavel newList o seguinte: */
    /* Se isLiked for verdadeiro, retorna uma lista filtrada de likedPostsStorage com só os posts diferentes do que foi clicado para remove-lo de lá */
    /* Se isLiked for falso, retorna likedPostsStorage com o post atual adicionado */

    updateLikedPostsStorage(newList)
    /* Guarda newList no localStorage */
  }

  return (
    <button className={style} onClick={handleClick}>
      {isLiked ? <HeartFilled /> : <HeartUnfilled />}
    </button>
  )
}

export default Like;