/**
 *
 * UploadImage
 *
 * @author Vittorio Scaperrotta
 * @date 22-Jan-2025
*/

import { useEffect, useRef, useState } from 'react';
import { nullSafe } from '@utils/globalMethods';
import messages from './messages';
import './UploadImage.scss';

const UploadImage = ({
  label = '',
  addImage = () => { },
  removeImage = () => { },
  image = ''
}) => {
  const ref = useRef(null);
  const [fileInfo, setFileInfo] = useState(null);

  function uploadDocument(file, event) {
    if (file !== null) {
      addImage(event)
      setFileInfo(file)
    }
  }

  function handleChangeInput(event) {
    const file = nullSafe(() => event.target.files[0], null);
    uploadDocument(file, event)
  }

  function handleButtonClick() {
    ref.current.click();
  }

  useEffect(() => {
    if (image === '') {
      setFileInfo(null);
    }
  }, [image])

  return (
    <div className='upload-image__container'>
      <label className='upload-image__label'>
        {label}
      </label>
      <div className='upload-image__content'>
        <div className='upload-image__file-name'>
          {nullSafe(() => fileInfo.name, '')}
        </div>

        {fileInfo !== null ? (
          <button
            className='upload-image__button'
            onClick={removeImage}
          >
            {messages.remove}
          </button>
        ) : (
          <button
            className='upload-image__button'
            onClick={handleButtonClick}
          >
            {messages.upload}
          </button>
        )}
        <input
          ref={ref}
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleChangeInput}
        />
      </div>
    </div >
  )
}

export default UploadImage;
