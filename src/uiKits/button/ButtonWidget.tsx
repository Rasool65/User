import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { StyleCustomBtn } from './style';

const ButtonWidget: React.FC<Button.IProps & ButtonHTMLAttributes<any>> = ({
  width,
  height,
  color,
  background,
  style,
  children,
  ...other
}) => {
  return (
    <StyleCustomBtn
      style={style}
      Width={width}
      Height={height}
      Color={color}
      Background={background}
      {...other}
    >
      {children}
    </StyleCustomBtn>
  );
};

export default ButtonWidget;
