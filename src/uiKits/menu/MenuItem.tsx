import React from 'react';
import { StyleMenuItem } from './style';

const MenuItem = (props) => {
  const { children, title, ...other } = props;
  return (
    <StyleMenuItem {...other}>{children ? children : title}</StyleMenuItem>
  );
};
export default MenuItem;
