import { useState } from 'react';

export default function StartBtn({ id }) {
  const [selected, setSelected] = useState(localStorage.getItem(id));
  const handleClick = () => {
    localStorage.setItem(id, !selected ? 'true' : '');
    setSelected(!selected);
  };

  return (
    <i
      onClick={handleClick}
      className={selected ? 'fas fa-star like-btn selected' : 'fas fa-star like-btn'}></i>
  );
}
