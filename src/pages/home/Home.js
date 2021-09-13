import { useEffect, useState } from 'react';
import Card from '../../components/Card';

export default function Home() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetch('cards.json')
      .then((r) => r.json())
      .then((r) => setCards(r));
  }, []);
  return cards.map(({ author, url, id, image }) => (
    <Card key={id} author={author} url={url} id={id} image={image} />
  ));
}
