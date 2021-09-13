import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import store from '../a';

export default function Nav() {
  const [navStatus, setNavStatus] = useState('');

  return (
    <nav className='navbar'>
      <h1 style={{ paddingLeft: '1rem' }}>
        <i
          onClick={() => (!!navStatus ? setNavStatus('') : setNavStatus('open'))}
          className='fas fa-bars side-bar-btn'
          style={{ marginRight: ' 0.75rem', transform: 'scale(0.8)' }}></i>
        <Link to='/'>DevPortfolios </Link>
      </h1>

      <Link className='add' to='/add-site'>
        ADD
      </Link>
      <aside className={navStatus}>
        <ul>
          <NavLink exact to='/' activeClassName='selected'>
            <li onClick={() => (!!navStatus ? setNavStatus('') : setNavStatus('open'))}>
              <i className='fas fa-random'></i> Daily Mix
            </li>
          </NavLink>
          {/* <li>
            <i className='fas fa-highlighter'></i> Highlighted
          </li> */}

          <NavLink exact to='/favorites' activeClassName='selected'>
            <li onClick={() => (!!navStatus ? setNavStatus('') : setNavStatus('open'))}>
              <i className='fas fa-star'></i> Favorites
            </li>
          </NavLink>

          <li onClick={() => (store.visible = !store.visible)}>
            <i className='fas fa-ticket-alt'></i> support
          </li>
        </ul>
      </aside>
    </nav>
  );
}
