import styled from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';

export const ToggleBtn = styled.div<{ status?: boolean; ref?: any }>`
  width: 37px;
  height: 20px;
  border-radius: 10px;
  background: ${(props) =>
    props.status ? colorPalette.green_10 : colorPalette.red_20};
  position: relative;
  transition: 0.3s;
  cursor: pointer;
`;

export const Circle = styled.div<{ status?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  transition: all 0.3s ease-in-out;
  position: absolute;
  right: ${(props) => (props.status ? '16px ' : 0)};
  background: ${(props) =>
    props.status ? colorPalette.green_300 : colorPalette.red_650};
`;
