import { useEffect, useState } from 'react';
import Card from '../../components/Card';

export default function Favorites() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const items = { ...localStorage };
    fetch('cards.json')
      .then((r) => r.json())
      .then((r) => setCards(r.filter((c) => items[c.id])));
  }, []);
  return cards.length ? (
    cards.map(({ author, url, id, image }) => (
      <Card key={id} author={author} url={url} id={id} image={image} />
    ))
  ) : (
    <h2>No favorites :(</h2>
  );
}
