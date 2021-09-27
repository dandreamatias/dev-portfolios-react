import { useEffect } from 'react';
import style from './Login.module.css';
import { useDispatch } from 'react-redux';
import { hide, updateBtn } from '../../features/navSlice';
import { useHistory } from 'react-router-dom';
import { env } from '../../environments/env';
import { HTTP } from '../../http';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await HTTP.post('admin/login', { username: 'admin', password: 'pippo' });
      console.log(res);
      localStorage.setItem('__token', res.access_token);
      if (res.access_token) {
        history.push('/admin');
      }
    } catch (e) {
      console.log(e);
    }
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
