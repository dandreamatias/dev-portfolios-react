import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hide } from '../../features/toastSlice';
import { toast } from './Toast.module.css';

export function Toast() {
  const visible = useSelector((state) => state.toast.visible);
  const message = useSelector((state) => state.toast.text);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      setTimeout(() => dispatch(hide()), 3000);
    }
  }, [visible]);
  return (
    <div style={{ display: visible ? 'block' : 'none' }} className={toast}>
      {message}
    </div>
  );
}
