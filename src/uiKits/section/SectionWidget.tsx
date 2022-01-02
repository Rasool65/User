import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  StyleSection,
  StyleSectionTitle,
  StyleTitleName,
  StyleSectionMore,
} from './style';
import ArrowLeft from '@assets/img/icon/Path 1801.svg';
import IconWidget from '@uikits/icon/IconWidget';

const Section = (props) => {
  const { children, name, more, detail, link, width } = props;
  const history = useHistory();
  return (
    <StyleSection width={width}>
      <StyleSectionTitle>
        <StyleTitleName>
          {name}
          <span>{detail ? ' / ' + detail : ''}</span>
        </StyleTitleName>
        {more === true && (
          <div
            onClick={() => {
              history.push(link);
            }}
          >
            <StyleSectionMore more={more}>
              نمایش همه
              <IconWidget
                alt='ArrowLeft'
                src={ArrowLeft}
                width={'15px'}
                height={'7px'}
              />
            </StyleSectionMore>
          </div>
        )}
      </StyleSectionTitle>
      {children}
    </StyleSection>
  );
};
export default Section;
