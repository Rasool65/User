import styled from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';

export const StyleCustomBtn = styled.button<{
  Height?: string;
  Width?: string;
  Color?: string;
  Background?: string;
}>`
  width: ${(props) => (props.Width ? props.Width : 'fit-content')};
  height: ${(props) => (props.Height ? props.Height : 'fit-content')};
  border: ${(props) =>
    props.disabled ? '1px solid ' + colorPalette.gray_60 : 'none'};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => {
    if (props.disabled) {
      return colorPalette.gray_100;
    } else {
      return props.Color ? props.Color : colorPalette.white;
    }
  }};
  background: ${(props) => {
    if (props.disabled) {
      return colorPalette.gray_40;
    } else {
      return props.Background ? props.Background : colorPalette.red_650;
    }
  }};
  border-radius: 6px;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.8rem;
  outline: none;
  overflow: hidden;
  gap: 5px;
`;
