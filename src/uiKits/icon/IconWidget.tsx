import React from 'react';
import { Icon } from './Icon';
import { StyleCustomIcon } from './style';

const IconWidget: React.FC<Icon.IProps> = ({
  width,
  height,
  alt,
  src,
  style,
  onClick,
}) => {
  return (
    <StyleCustomIcon
      Width={width}
      Height={height}
      alt={alt}
      src={src}
      style={style}
      onClick={onClick}
    />
  );
};

export default IconWidget;
