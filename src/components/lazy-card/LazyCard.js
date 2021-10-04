import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from '../../features/sitesSlice';
import style from './LazyCard.module.css';

export default function LazyCard({ hasMore }) {
  const cardContainer = useRef(null);
  const start = useSelector((state) => state.sites.start);
  const loading = useSelector((state) => state.sites.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    let time = Date.now();
    const listen = () => {
      if (cardContainer.current && !loading && Date.now() - time > 200) {
        const container = cardContainer?.current?.getBoundingClientRect();
        if (container.top - container.height < container.height) {
          time = Date.now();
          dispatch(get('?start=' + start));
        }
      }
    };
    window.addEventListener('scroll', listen);

    return () => window.removeEventListener('scroll', listen);
  }, [loading, start]);

  return hasMore ? (
    <div ref={cardContainer} className={style['lucid-card-container']}>
      <div className={style.card}>
        <div className={`${style['as-image']} ${style.lucid}`}></div>
        <div className={style.card__info}></div>
        <div className={style.card__footer}>
          <i className='fas fa-star like-btn lucid'></i>
          <p target='_blank' rel='noreferrer' className='visit-btn lucid'></p>
        </div>
      </div>
      <div className={style.card}>
        <div className={style['as-image'] + ' ' + style.lucid}></div>
        <div className={style.card__info}></div>
        <div className={style.card__footer}>
          <i className='fas fa-star like-btn lucid'></i>
          <p target='_blank' rel='noreferrer' className='visit-btn lucid'></p>
        </div>
      </div>
    </div>
  ) : (
    <p>no more data :(</p>
  );
}
