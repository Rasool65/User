import styled from 'styled-components';

import { colorPalette } from '@uikits/colors/Color';

export const StyleFormItemContainer = styled.div<{ style?: any }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  ${(p) => (p.style ? p.style : '')};
`;

export const StyleFormItemLable = styled.div<{ required?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  user-select: none;
  & span.lable__required {
    display: ${(p) => (p.required ? 'inline-block' : 'none')};
    width: 10px;
    height: 10px;
    color: ${colorPalette.red_100};
    padding-right: 5px;
  }
  & span.lable {
    font-size: 13px;
    font-weight: 500;
    color: ${colorPalette.gray_850};
  }
`;
