import { env } from './environments/env';
import quoll from 'quoll-http';
import history from './history.js';

const devPortfoliosApi = quoll.create(env.url);

devPortfoliosApi.onStatus(401, () => {
  history.push('/login');
  localStorage.removeItem('__token');
  window.location.reload();
});

devPortfoliosApi.onStart(() => {
  devPortfoliosApi.setHeader({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    mode: 'cors',
    Authorization: `Bearer ${localStorage.getItem('__token')}`,
  });
});

export { devPortfoliosApi };
