import React, { useState, useRef, useEffect } from 'react';
import {
  StyleCollapse,
  CollapseHeader,
  CollapseTitle,
  TitleBullet,
  CollapseContent,
} from './style';
import IconWidget from '@uikits/icon/IconWidget';
import open from '@assets/img/icon/add.svg';
import close from '@assets/img/icon/Path 44.svg';

const Collapse = (props) => {
  const { children, title, id, menu, isOpen } = props;
  const content = useRef<any>();
  const [icon, setIcon] = useState(open);

  const handleCollapse = (collapseId) => {
    if (icon === open) {
      setIcon(close);
    } else if (icon === close) {
      setIcon(open);
    }
    if (content?.current?.style.maxHeight) {
      content?.current?.setAttribute('style', `max-height: ${undefined}`);
    } else {
      content?.current?.setAttribute(
        'style',
        `max-height: ${content?.current?.scrollHeight}px`
      );
    }
  };

  useEffect(() => {
    if (!isOpen) {
      content?.current?.setAttribute('style', `max-height: ${undefined}`);
      setIcon(open);
    } else {
      content?.current?.setAttribute(
        'style',
        `max-height: ${content?.current?.scrollHeight}px`
      );
      setIcon(close);
    }
  }, [isOpen]);

  return (
    <StyleCollapse>
      <CollapseHeader
        onClick={() => {
          handleCollapse(id);
        }}
        menu={menu}
      >
        <TitleBullet />
        <CollapseTitle>{title}</CollapseTitle>
        <IconWidget alt='open' src={icon} width={'17px'} height={'17px'} />
      </CollapseHeader>
      <CollapseContent ref={content} id={'content' + id}>
        {children}
      </CollapseContent>
    </StyleCollapse>
  );
};
export default Collapse;
