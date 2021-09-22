import { useState } from 'react';
import style from './ContextMenu.module.css';

export default function ContextMenuBtn({ id }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <i
      onClick={handleClick}
      className='fas fa-ellipsis-h'
      style={{ color: '#5f6368', position: 'relative' }}>
      <div className={open ? style['ctx-menu-open'] : 'hidden'}>
        <div onClick={() => console.log(id)}>Report</div>
      </div>
    </i>
  );
}
