import Resizer from 'react-image-file-resizer';

export default function resizeFile(file) {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      640,
      480,
      'JPEG',
      65,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64'
    );
  });
}
