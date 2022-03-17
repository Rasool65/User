import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { MediaQueryStyle, CustomSize } from '@utils/MediaQuery';

export const StyleSection = styled.section<{ width?: string }>`
  padding: 5px 0;
  ${(props) => (props.width ? `width:${props.width}` : '')};
  margin: 5px auto;
`;

export const StyleSectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const StyleTitleName = styled.h4`
  font-size: 16px;
  border-right: 2px solid ${colorPalette.red_650};
  padding: 0 15px;
  > span {
    font-size: 14px;
    color: ${colorPalette.gray_80};
  }
  ${MediaQueryStyle.sm(css`
    font-size: 14px;
  `)}
`;

export const StyleSectionMore = styled.p<{ more?: boolean; onClick?: any }>`
  font-size: 13px;
  color: ${colorPalette.gray_240};
  cursor: pointer;
  display: ${(props) => (props.more === true ? 'block' : 'none')};
  ${MediaQueryStyle.sm(css`
    display: flex;
    align-items: center;
    font-size: 12px;
    justify-content: space-between;
  `)}
`;
