import { useEffect, useState } from 'react';
import style from './Login.module.css';
import { useDispatch } from 'react-redux';
import { hide, updateBtn } from '../../features/navSlice';
import { devPortfoliosApi } from '../../http';
import history from '../../history';
import { show } from '../../features/toastSlice';

export default function Login() {
  const [form, setForm] = useState({
    password: '',
    username: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateBtn({
        show: false,
        path: '/',
      })
    );
    dispatch(hide());
  }, []);

  const handleFormChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [res, error] = await devPortfoliosApi.post('admin/login', {
      username: form.username,
      password: form.password,
    });
    if (error) {
      dispatch(show(error.response.status));
      return;
    }
    localStorage.setItem('__token', res.access_token);
    history.push('/admin');
    window.location.reload();
  };

  return (
    <main className={style.main}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className='mb'>Login</h1>
        <input
          className='input mb'
          type='text'
          name='username'
          onChange={handleFormChange}
          value={form.username}
          placeholder='user'
        />
        <input
          className='input mb'
          type='password'
          onChange={handleFormChange}
          value={form.password}
          name='password'
          placeholder='password'
        />
        <input className='button w-100' type='submit' value='Login' />
      </form>
    </main>
  );
}
