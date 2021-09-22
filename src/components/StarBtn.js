export default function StartBtn({ id, handleClick, selected }) {
  return (
    <i
      onClick={() => handleClick(!selected)}
      className={selected ? 'fas fa-star like-btn selected' : 'fas fa-star like-btn'}></i>
  );
}
