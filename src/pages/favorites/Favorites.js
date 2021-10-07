import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { useDispatch } from 'react-redux';
import { hide, show } from '../../features/navSlice';

export default function Favorites() {
  const [cards, setCards] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.innerWidth > 1080) {
      dispatch(show());
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

  useEffect(() => {
    const items = Object.entries({ ...localStorage })
      .filter(([key, val]) => key !== '__token')
      .map(([key, val]) => JSON.parse(val ?? ''));
    setCards(items);
  }, []);

  return (
    <main className='main'>
      {!cards.length && <div>No favorites, double tap on a site to add one</div>}
      {cards.map(({ author, url, photo }) => (
        <Card key={url} author={author} url={url} id={url} photo={photo} />
      ))}
    </main>
  );
}
