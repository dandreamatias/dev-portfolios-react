import { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import './AddSite.css';
import getCroppedImg from './cropImage';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { show } from '../../features/toastSlice';
import resizeFile from './resizer';
import { env } from '../../environments/env';
import { hide as hideSidebar, show as showSidebar, updateBtn } from '../../features/navSlice';
import { HTTP } from '../../http';

export default function AddSite() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({ author: '', website: '' });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  let history = useHistory();

  useEffect(() => {
    const callback = () => {
      if (window.innerWidth > 1080) {
        dispatch(showSidebar());
      } else {
        dispatch(hideSidebar());
      }
    };
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, []);

  useEffect(() => {
    if (window.innerWidth > 1080) {
      dispatch(showSidebar());
    }
    dispatch(
      updateBtn({
        show: false,
        path: '/',
      })
    );
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleChange = (file) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      setSelectedFile(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSendClick = useCallback(async () => {
    const croppedImage = await getCroppedImg(selectedFile, croppedAreaPixels, rotation);
    const resized = await resizeFile(croppedImage);
    await HTTP.post('sites', { image: resized, website: form.website, author: form.author });
    dispatch(show('Thanks for your submission 🥰'));
    history.push('/daily-mix');
  }, [croppedAreaPixels, rotation, form, selectedFile]);

  const handleFormChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <main className='main'>
      <div className='add-site'>
        <div className='add-image-container'>
          <span className='upload-image-message'>
            <i className='fas fa-upload'></i> Upload Image
          </span>
          {selectedFile ? (
            <Cropper
              image={selectedFile}
              crop={crop}
              className='cropper'
              zoom={zoom}
              rotation={rotation}
              style={{ width: '100%' }}
              aspect={4 / 3}
              objectFit={'vertical-cover'}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          ) : (
            <input
              style={{ display: 'block', width: ' 100%' }}
              className='upload-input cursor-pointer'
              onChange={(e) => handleChange(e.target.files[0])}
              type='file'
              accept='.jpg,.jpeg,.png'
            />
          )}
        </div>
        <div className='input-group'>
          <input
            className='input'
            id='ok'
            placeholder='&nbsp;'
            value={form.author}
            onChange={handleFormChange}
            type='text'
            name='author'
          />
          <label className='label' htmlFor='ok'>
            Author
          </label>
        </div>
        <div className='input-group'>
          <input
            className='input'
            id='asd'
            onChange={handleFormChange}
            placeholder='&nbsp;'
            type='text'
            value={form.website}
            name='website'
          />
          <label className='label' htmlFor='asd'>
            website Url
          </label>
        </div>
        <button className='button w-100 send-btn' onClick={handleSendClick}>
          Publish
        </button>
      </div>
    </main>
  );
}
