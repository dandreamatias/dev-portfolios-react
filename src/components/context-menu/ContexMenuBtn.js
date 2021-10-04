import { useState } from 'react';
import style from './ContextMenu.module.css';
import { useDispatch } from 'react-redux';
import { show } from '../../features/toastSlice';

export default function ContextMenuBtn({ id }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    const handleDocumentClick = () => {
      setOpen(false);
      window.removeEventListener('click', handleDocumentClick);
    };
    if (!open) {
      window.addEventListener('click', handleDocumentClick);
    }
    setOpen(!open);
  };

  return (
    <i
      onClick={handleClick}
      className='fas fa-ellipsis-h'
      style={{ color: '#5f6368', position: 'relative' }}>
      {open && (
        <div className={style['ctx-menu-open']}>
          <div onClick={() => dispatch(show('Thank you, the website will be reviewed'))}>
            Report
          </div>
        </div>
      )}
    </i>
  );
}
