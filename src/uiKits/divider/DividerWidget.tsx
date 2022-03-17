import React from 'react';

import { Divider } from './Divider';
import { StyleDivider } from './style';

const DividerWidget: React.FC<Divider.IProps> = ({
  width,
  height,
  type,
  background,
}) => {
  return (
    <StyleDivider
      Width={width}
      Height={height}
      Type={type}
      Background={background}
    />
  );
};

export default DividerWidget;
