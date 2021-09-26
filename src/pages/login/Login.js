import { useEffect } from 'react';
import style from './Login.module.css';
import { useDispatch } from 'react-redux';
import { hide, updateBtn } from '../../features/navSlice';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    dispatch(
      updateBtn({
        show: false,
        path: '/',
      })
    );
    dispatch(hide());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('__token', 'adiwd98u3duaqu73tdq9');
    history.push('/admin');
  };

  return (
    <main className={style.main}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className='mb'>Login</h1>
        <input className='input mb' type='text' placeholder='user' />
        <input className='input mb' type='password' placeholder='password' />
        <input className='button w-100' type='submit' value='input' />
      </form>
    </main>
  );
}
