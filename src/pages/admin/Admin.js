import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import style from './Admin.module.css';
import { useDispatch } from 'react-redux';
import { hide as hideSidebar, updateBtn } from '../../features/navSlice';
import { devPortfoliosApi } from '../../http';
import { show } from '../../features/toastSlice';

export default function Admin() {
  const dispatch = useDispatch();
  const [card, setCard] = useState(undefined);

  const getCard = async () => {
    const [res, error] = await devPortfoliosApi.get('admin/unapproved');
    if (error) return;
    if (Object.keys(res).length === 0) {
      dispatch(show('No more cards to check'));
      return setCard(null);
    }
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
    return getCard();
  }, []);

  const handleApproveClick = async () => {
    await devPortfoliosApi.put('admin/approve', { id: card.url });
    getCard();
  };

  const handleRejectClick = async () => {
    await devPortfoliosApi.delete('admin/remove', { id: card.url });
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
            <Card author={card.author} url={card.url} photo={card.photo} />
            <iframe
              className={style.iframe}
              src={card.url}
              title='url'
              width='640'
              height='583'
              style={{ border: '0px', backgroundColor: '#333', marginBottom: '2rem' }}></iframe>
          </>
        )}
      </div>
    </main>
  );
}
