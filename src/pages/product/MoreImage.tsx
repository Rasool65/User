import { useState } from 'react';
import {
  AlbumItem,
  DialogCustom,
  DialogTitle,
  DialogContent,
  DialogContentRight,
  DialogContentLeft,
} from './style';
import IconWidget from '@uikits/icon/IconWidget';
import close from '@assets/img/icon/close.png';
import { BASE_URL } from '@config/urls';

const MoreImage = (props) => {
  const { name, Images, CloseDialog, firstImage } = props;
  const [currentImag, setCurrentImag] = useState(firstImage);

  const handleImage = (img) => {
    setCurrentImag(img);
  };

  return (
    <DialogCustom>
      <DialogTitle>
        <p>{name}</p>
        <div onClick={CloseDialog}>
          <IconWidget alt='close' src={close} width={'12px'} height={'12px'} />
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentRight>
          <img alt='product' src={`${BASE_URL}${currentImag}`} />
        </DialogContentRight>
        <DialogContentLeft>
          {Images.map((item, index) => {
            return (
              <AlbumItem
                isActive={item === currentImag}
                key={index}
                onClick={() => {
                  handleImage(item);
                }}
              >
                <img
                  alt={item.title}
                  src={`${BASE_URL}${item?.replace('_n', '')}`}
                />
              </AlbumItem>
            );
          })}
        </DialogContentLeft>
      </DialogContent>
    </DialogCustom>
  );
};

export default MoreImage;
