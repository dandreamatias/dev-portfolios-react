import { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import AddSiteStyle from './AddSite.module.css';
import getCroppedImg from './cropImage';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { show } from '../../features/toastSlice';
import resizeFile from './resizer';
import { hide as hideSidebar, show as showSidebar, updateBtn } from '../../features/navSlice';
import { HTTP } from '../../http';
import { Spinner } from '../../components/spinner/Spinner';
import { termAndConditions } from '../../helpers';

export default function AddSite() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [toogleTerms, setToogleterms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ author: '', url: '', conditions: false });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
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

  const isFormvalid = () => {
    return !!form.url && !!form.author && !!selectedFile;
  };

  const handleSendClick = useCallback(async () => {
    if (isFormvalid()) {
      setLoading(true);
      const croppedImage = await getCroppedImg(selectedFile, croppedAreaPixels, 0);
      const resized = await resizeFile(croppedImage);
      await HTTP.post('sites', { photo: resized, url: form.url, author: form.author });
      dispatch(show('Thanks for your submission 🥰'));
      history.push('/daily-mix');
      setLoading(false);
    } else dispatch(show('All the fields are mandatory'));
  }, [croppedAreaPixels, form, selectedFile]);

  const handleFormChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <main className='main'>
      <div className={AddSiteStyle['add-site']}>
        <div className={AddSiteStyle['add-image-container']}>
          <span className={AddSiteStyle['upload-image-message']}>
            <i className='fas fa-upload'></i> Upload Image*
          </span>
          {selectedFile ? (
            <Cropper
              image={selectedFile}
              crop={crop}
              className='cropper'
              zoom={zoom}
              style={{ width: '100%' }}
              aspect={4 / 3}
              objectFit={'horizontal-cover'}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          ) : (
            <input
              style={{ display: 'block', width: ' 100%' }}
              className={AddSiteStyle['upload-input'] + ' cursor-pointer'}
              onChange={(e) => handleChange(e.target.files[0])}
              type='file'
              accept='.jpg,.jpeg,.png'
            />
          )}
        </div>
        <div className='input-group'>
          <input
            className='input'
            id='author'
            placeholder='&nbsp;'
            value={form.author}
            onChange={handleFormChange}
            type='text'
            name='author'
          />
          <label className='label' htmlFor='author'>
            Author*
          </label>
        </div>
        <div className='input-group'>
          <input
            className='input'
            id='url'
            onChange={handleFormChange}
            placeholder='&nbsp;'
            type='text'
            value={form.url}
            name='url'
          />
          <label className='label' htmlFor='url'>
            Website Url*
          </label>
          <small
            style={{
              position: 'absolute',
              left: '.5rem',
              top: '100%',
              fontSize: '.75rem',
              color: '#444',
            }}>
            format: https://www.example.com
          </small>
        </div>
        <div className='input-group'>
          <input
            type='checkbox'
            name='conditions'
            onChange={handleFormChange}
            value={form.conditions}
          />{' '}
          I accept{' '}
          <b className='cursor-pointer' onClick={() => setToogleterms(!toogleTerms)}>
            term and conditions
          </b>
          {toogleTerms && (
            <textarea
              rows='3'
              value={termAndConditions}
              readOnly
              className={AddSiteStyle['termAndConditions'] + ' textarea'}></textarea>
          )}
        </div>
        <button
          className={`button w-100 ` + AddSiteStyle['send-btn']}
          onClick={(e) => (loading ? null : handleSendClick(e))}>
          {loading ? (
            <>
              <Spinner /> Uploading...
            </>
          ) : (
            'Publish'
          )}
        </button>
      </div>
    </main>
  );
}
