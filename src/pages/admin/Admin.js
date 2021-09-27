import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { env } from '../../environments/env';
import style from './Admin.module.css';
import { useDispatch } from 'react-redux';
import { hide as hideSidebar, updateBtn } from '../../features/navSlice';
import { httpHeader } from '../../helpers';
import { HTTP } from '../../http';

export default function Admin() {
  const dispatch = useDispatch();
  const [card, setCard] = useState(undefined);

  const getCard = async () => {
    const res = await HTTP.get('admin/unapproved');
    setCard(res);
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
    await HTTP.post('admin/approve', { id: card.website });
    getCard();
  };

  const handleRejectClick = async () => {
    await HTTP.get('admin/unapprove', { id: card.website });
    getCard();
  };

  return (
    <main className={style.container}>
      {card && (
        <div className={style.buttonContainer}>
          <button className='button' onClick={handleApproveClick}>
            Approve
          </button>
          <button className='button' onClick={handleRejectClick} style={{ background: '#cd0f0f' }}>
            Reject
          </button>
        </div>
      )}
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
