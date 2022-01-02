import React from 'react';
import { StyleMenu } from './style';

const Menu = (props) => {
  const { children, color, typeItem, size } = props;
  return (
    <StyleMenu color={color} typeItem={typeItem} size={size}>
      {children}
    </StyleMenu>
  );
};
export default Menu;
