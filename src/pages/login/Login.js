import { useEffect, useState } from 'react';
import style from './Login.module.css';
import { useDispatch } from 'react-redux';
import { hide, updateBtn } from '../../features/navSlice';
import { useHistory } from 'react-router-dom';
import { HTTP } from '../../http';

export default function Login() {
  const [form, setForm] = useState({
    password: '',
    username: '',
  });
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

  const handleFormChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await HTTP.post('admin/login', {
      username: form.username,
      password: form.password,
    });
    localStorage.setItem('__token', res.access_token);
    if (res.access_token) {
      history.push('/admin');
    }
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
