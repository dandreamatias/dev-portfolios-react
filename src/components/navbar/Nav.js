import { NavLink, Link } from 'react-router-dom';
import navStyle from './Nav.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { hide, show } from '../../features/navSlice';

export default function Nav() {
  const visible = useSelector((state) => state.nav.visible);
  const navButton = useSelector((state) => state.nav.button);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (window.innerWidth < 1080) {
      visible ? dispatch(hide()) : dispatch(show());
    }
  };

  return (
    <nav className={navStyle.navbar}>
      <h1 style={{ paddingLeft: '1rem' }}>
        <i
          onClick={handleClick}
          className={'fas fa-bars ' + navStyle['side-bar-btn']}
          style={{ marginRight: ' 0.75rem', transform: 'scale(0.8)' }}></i>
        <Link to='/'>DevPortfolios </Link>
      </h1>

      <Link className={navButton.show ? navStyle['add-btn'] : 'hidden'} to={navButton.path}>
        {navButton.text}
      </Link>
      <aside className={(visible ? navStyle.open : 'hidden') + ' ' + navStyle.aside}>
        <ul>
          <NavLink exact to='/daily-mix' activeClassName={navStyle['selected']}>
            <li onClick={handleClick}>
              <i className='fas fa-random'></i> Daily Mix
            </li>
          </NavLink>
          {/* <li>
            <NavLink exact to='/highlighted' activeClassName={navStyle['selected']}>
              <i className='fas fa-highlighter'></i> Highlighted
            </NavLink>
          </li> */}

          <NavLink exact to='/favorites' activeClassName={navStyle['selected']}>
            <li onClick={handleClick}>
              <i className='fas fa-star'></i> Favorites
            </li>
          </NavLink>
          <NavLink exact to='/add-site' activeClassName={navStyle['selected']}>
            <li onClick={handleClick}>
              <i className='fas fa-plus'></i> Add website
            </li>
          </NavLink>

          <li className={navStyle.bottom}>
            <i className='fas fa-donate'></i> Support
          </li>
        </ul>
      </aside>
    </nav>
  );
}
