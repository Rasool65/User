import React, { Children } from 'react';

import { Banner } from './Banner';
import { StyleBanner } from './style';

const BannerWidget: React.FC<Banner.IProps> = ({
  width,
  height,
  background,
  type,
  backgroundSize,
  smHeight,
  children,
}) => {
  return (
    <StyleBanner
      width={width}
      height={height}
      background={background}
      type={type}
      backgroundSize={backgroundSize}
      smHeight={smHeight}
    >
      {children}
    </StyleBanner>
  );
};

export default BannerWidget;
