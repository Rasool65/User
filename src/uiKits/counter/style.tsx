import { colorPalette } from '@uikits/colors/Color';
import styled, { css } from 'styled-components';
import { MediaQueryStyle, CustomSize } from '@utils/MediaQuery';

export const StyleCartCounter = styled.div`
  background: white;
  border: 1px solid #e2e5e8b5;
  border-radius: 10px;
  padding: 0 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 3px;
  width: 73px;
  height: 32px;
  max-width: 7rem;
  ${MediaQueryStyle.customMinWidth(
    CustomSize.lg,
    css`
      flex-grow: 0.7;
    `
  )}
`;

export const StyleCounterBtn = styled.div`
  font-size: 14px;
  color: ${colorPalette.gray_250};
  padding: 0 7px;
  cursor: pointer;
`;
