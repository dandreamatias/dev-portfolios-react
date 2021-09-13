import StartBtn from './StarBtn';
export default function Card({ author, url, id, image }) {
  return (
    <div className='card'>
      <img className='' src={image} alt='' />
      <div className='card__info'>
        <h1>{author}</h1>
        <i className='fas fa-ellipsis-h' style={{ color: '#5f6368' }}></i>
      </div>
      <div className='card__footer'>
        <StartBtn id={id} />
        <a href={url} target='_blank' rel='noreferrer' className='visit-btn'>
          visit
          <i className='fas fa-chevron-right'></i>
        </a>
      </div>
    </div>
  );
}
