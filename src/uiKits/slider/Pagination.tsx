import { ChangeEvent, useState, FC, useEffect } from 'react';
import {
  StylePagination,
  StylePaginationBullets,
  StyleBullet,
  StyleArrow,
} from './style';
import IconWidget from '@uikits/icon/IconWidget';
import ArrowRight from '@assets/img/icon/Path 1794.svg';
import ArrowLeft from '@assets/img/icon/Path 1800.svg';
import { ISlider } from './Slider';

const Pagination: FC<ISlider.IChangeImage> = ({
  Images,
  CurrentImageId,
  onChageImage,
}) => {
  const [slidersCount, setSlidersCount] = useState<number>(Images.length);

  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof current === 'number') {
        if (current < Images.length - 1) {
          clearInterval(interval);
          setCurrent(current + 1);
          onChageImage!(current + 1);
        } else if (current === Images.length - 1) {
          clearInterval(interval);
          setCurrent(0);
          onChageImage!(0);
        }
      }
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [current]);

  const nextStep = (type) => {
    if (typeof current === 'number') {
      if (type === 'previous') {
        if (current > 0) {
          setCurrent(current - 1);
          onChageImage!(current - 1);
        } else if (current === 0) {
          setCurrent(slidersCount - 1);
          onChageImage!(slidersCount - 1);
        }
      } else if (type === 'next') {
        if (current < slidersCount - 1) {
          setCurrent(current + 1);
          onChageImage!(current + 1);
        } else if (current === slidersCount - 1) {
          setCurrent(0);
          onChageImage!(0);
        }
      }
    }
  };

  return (
    <StylePagination id='pagination'>
      <StyleArrow
        onClick={() => {
          nextStep('previous');
        }}
      >
        <IconWidget
          alt='ChevronUp'
          src={ArrowRight}
          width={'20px'}
          height={'15px'}
        />
      </StyleArrow>
      <StylePaginationBullets>
        {Images.map((value, index) => {
          return (
            <StyleBullet
              onClick={() => {
                setCurrent(index);
                onChageImage!(index);
              }}
              key={index}
              isActive={CurrentImageId === value.id ? true : false}
            />
          );
        })}
      </StylePaginationBullets>
      <StyleArrow
        onClick={() => {
          nextStep('next');
        }}
      >
        <IconWidget
          alt='ChevronUp'
          src={ArrowLeft}
          width={'20px'}
          height={'15px'}
        />
      </StyleArrow>
    </StylePagination>
  );
};

export default Pagination;
