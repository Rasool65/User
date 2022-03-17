import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { MediaQueryStyle, CustomSize } from '@utils/MediaQuery';

export const StyleCategoryItem = styled.div`
  display: flex;
  min-width: 100px;
  height: 48px;
  border-radius: 9px;
  padding: 0 5px;
  margin: 0 10px;
  align-items: center;
  border: 1px solid ${colorPalette.gray_30};
  cursor: pointer;
  flex-direction: row-reverse;
`;

export const StyleCategoryIcon = styled.img`
  width: 25px;
  height: 25px;
  margin: 0 0 0 8px;
`;

export const StyleCategoryName = styled.p`
  font-size: 17px;
  color: ${colorPalette.gray_300};
  flex-grow: 1;
  text-align: end;
`;

export const StyleContainerCategory = styled.div`
  background: white;
  position: relative;
  margin-bottom: 25px;
  ${MediaQueryStyle.sm(css`
    margin-top: 55px;
  `)}
`;
