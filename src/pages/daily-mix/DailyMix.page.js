import { useEffect } from 'react';
import Card from '../../components/card/Card';
import LazyCard from '../../components/lazy-card/LazyCard';
import { useSelector, useDispatch } from 'react-redux';
import { get } from '../../features/prova';
import { hide, show, updateBtn } from '../../features/navSlice';

export default function DailyMixPage() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.sites.cards);

  useEffect(() => {
    if (window.innerWidth > 1080) {
      dispatch(show());
    }
    dispatch(
      updateBtn({
        show: true,
        text: 'ADD',
        path: '/add-site',
      })
    );
    if (cards && cards.length === 1) {
      dispatch(get('?start=0'));
    }
  }, []);

  useEffect(() => {
    const callback = () => {
      if (window.innerWidth > 1080) {
        dispatch(show());
      } else {
        dispatch(hide());
      }
    };
    window.addEventListener('resize', callback);

    return () => window.removeEventListener('resize', callback);
  }, []);

  return (
    <main className='main'>
      {cards.map(({ author, website, image, hasMore, isLazy }) =>
        !isLazy ? (
          <Card key={website + Math.random()} author={author} url={website} image={image} />
        ) : (
          <LazyCard key={'__end__'} hasMore={hasMore} />
        )
      )}
    </main>
  );
}
