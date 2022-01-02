import styled from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';

export const NavRoute = styled.div`
  color: ${colorPalette.gray_90};
`;

export const RouteItem = styled.p`
  font-size: 14px;
  display: inline-block;
  color: ${colorPalette.gray_90};
  > span {
    font-size: 10px;
    margin: 0 8px;
  }
`;
