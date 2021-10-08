import StartBtn from '../StarBtn';
import ContextMenuBtn from '../context-menu/ContexMenuBtn';
import { useState } from 'react';
import style from './Card.module.css';
import { useSingleAndDoubleClick } from '../../hooks/use-single-and-doubleclick';

export default function Card({ author, url, photo }) {
  const [selected, setSelected] = useState(localStorage.getItem(url));
  const [liked, setLiked] = useState(false);

  const click = useSingleAndDoubleClick(
    () => {
      Object.assign(document.createElement('a'), {
        target: '_blank',
        href: url,
      }).click();
    },
    (e) => {
      e.stopPropagation();
      like();
      handleClick(true);
    }
  );

  const handleClick = (like) => {
    if (like) {
      localStorage.setItem(url, JSON.stringify({ author, url, photo }));
    } else {
      localStorage.removeItem(url);
    }
    setSelected(like);
  };

  const like = () => {
    setLiked(true);
    setTimeout(() => setLiked(false), 500);
  };

  return (
    <div className={style.card}>
      {liked && <i className='fas fa-star like-btn selected fade-like'></i>}
      <img onClick={click} src={photo} alt={`${author} webiste preview`} />
      <div className={style.card__info}>
        <h1>{author}</h1>
        <ContextMenuBtn id={url} />
      </div>
      <div className={style.card__footer}>
        <StartBtn selected={selected} handleClick={handleClick} id={url} />
        <a href={url} target='_blank' rel='noreferrer' className='visit-btn'>
          visit
          <i className='fas fa-chevron-right'></i>
        </a>
      </div>
    </div>
  );
}
