import React from "react"
import HeartFilled from "../Icons/HeartFilled"
import HeartUnfilled from "../Icons/HeartUnfilled"

const Like = ({id, style}) => {
  const [isLiked, setIsLiked] = React.useState(() => {
    const value = localStorage[id] === 'true' ? true : false;
    return value;
  });

  const handleClick = (event) => {
    event.stopPropagation();

    const newIsLiked = !isLiked
    setIsLiked(newIsLiked);

    localStorage[id] = newIsLiked.toString();
  }

  return (
    <button className={style} onClick={handleClick}>
      {isLiked ? <HeartFilled /> : <HeartUnfilled />}
    </button>
  )
}

export default Like;