import style from './Home.module.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hide, updateBtn } from '../../features/navSlice';
import { get } from '../../features/sitesSlice';

export default function Home() {
  const dispatch = useDispatch();
  const start = useSelector((state) => state.sites.start);
  useEffect(() => {
    dispatch(hide());
    dispatch(
      updateBtn({
        show: true,
        text: 'EXPLORE',
        path: '/daily-mix',
      })
    );
    if (start === 0) {
      dispatch(get(0));
    }
  }, [start]);
  return (
    <main className={style.container}>
      <div className={style.header}>
        <h1>
          Get inspired by hundreds <br /> of dev portfolios.
        </h1>
        <Link className={style['explore-btn']} to='/daily-mix'>
          EXPLORE
        </Link>
      </div>

      <div className={style.section}>
        <div className={style.imageSection}>
          <img className={style.img} src='inspiration.jpg' alt='person who think' />
        </div>
        <div className={style.Textsection}>
          <h2>Discover.</h2>
          <p>
            Everyday new websites to discover. An incredible source of inspiration for your next
            portfolio!
          </p>
        </div>
      </div>
      <div className={style.section + ' ' + style.sectionReverse}>
        <div className={style.imageSection}>
          <img className={style.img} src='upload.jpg' loading='lazy' alt='upload website' />
        </div>
        <div className={style.Textsection}>
          <h2>Share.</h2>
          <p>
            Have you built a portfolio? Are you proud of it? Share it for free with the community
            and help others developers.
          </p>
        </div>
      </div>
      <div className={style.section}>
        <div className={style.imageSection}>
          <img
            className={style.img}
            src='free.jpg'
            loading='lazy'
            alt='developer in chair with a pc'
          />
        </div>
        <div className={style.Textsection}>
          <h2>Free.</h2>
          <p>
            devportfolios.net it's an open source project. It will always be free and visible to
            anyone with no registration or subscription required. You can support the project here.
          </p>
        </div>
      </div>
      <footer className={style.footer}>
        <a href='https://www.linkedin.com/in/matiasdandrea318'>Author</a>
        ©DevPortfolios2021
        <a href='https://github.com/dandreamatias/dev-portfolios-react'>Github</a>
      </footer>
    </main>
  );
}
