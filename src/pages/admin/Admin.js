import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { env } from '../../environments/env';
import style from './Admin.module.css';
import { useDispatch } from 'react-redux';
import { hide as hideSidebar, updateBtn } from '../../features/navSlice';

export default function Admin() {
  const dispatch = useDispatch();
  const [card, setCard] = useState(undefined);

  const getCard = async () => {
    await fetch(env.url + 'admin/unapproved')
      .then((r) => r.json())
      .then((d) => setCard(d))
      .catch((e) => setCard(undefined));
  };
  useEffect(() => {
    dispatch(
      updateBtn({
        show: false,
        path: '/',
      })
    );
    dispatch(hideSidebar());
    getCard();
  }, []);

  const handleApproveClick = async () => {
    await fetch(env.url + 'admin/approve', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: card.website }),
    });
    getCard();
  };

  const handleRejectClick = async () => {
    await fetch(env.url + 'admin/unapprove', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: card.website }),
    });
    getCard();
  };

  return (
    <main className={style.container}>
      <div className={style.buttonContainer}>
        <button className='button' onClick={handleApproveClick}>
          Approve
        </button>
        <button className='button' onClick={handleRejectClick} style={{ background: '#cd0f0f' }}>
          Reject
        </button>
      </div>
      <div className={style.cardPreviewContainer}>
        {card && (
          <>
            <Card author={card.author} url={card.website} image={card.image} />
            <iframe
              src={card.website}
              title='website'
              width='640'
              height='583'
              style={{ border: '0px', backgroundColor: '#333', marginBottom: '2rem' }}></iframe>
          </>
        )}
      </div>
    </main>
  );
}
