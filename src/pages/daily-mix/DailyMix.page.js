import { useEffect } from 'react';
import Card from '../../components/card/Card';
import LazyCard from '../../components/lazy-card/LazyCard';
import { useSelector, useDispatch } from 'react-redux';
import { get } from '../../features/sitesSlice';
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
      dispatch(get(0));
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
      {cards.map(({ author, url, photo, hasMore, isLazy }) =>
        isLazy ? (
          <LazyCard key={'__end__'} hasMore={hasMore} />
        ) : (
          <Card key={url} author={author} url={url} photo={photo} />
        )
      )}
    </main>
  );
}
