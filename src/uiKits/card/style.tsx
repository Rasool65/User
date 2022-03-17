import styled from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';

export const CardSection = styled.section<{ color?: string; border?: string }>`
  background: ${colorPalette.white};
  border: 1px solid ${colorPalette.gray_45};
  border-top-color: ${(props) =>
    props.color ? props.color : colorPalette.gray_45};
  border-top-width: ${(props) => (props.border ? props.border : '6px')};
  margin-bottom: 15px;
`;
