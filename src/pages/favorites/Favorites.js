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
    const items = Object.entries({ ...localStorage }).map(([key, val]) => JSON.parse(val));
    setCards(items);
  }, []);

  return (
    <main className='main'>
      {cards.map(({ author, website, image }) => (
        <Card key={website} author={author} url={website} id={website} image={image} />
      ))}
    </main>
  );
}
