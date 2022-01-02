import styled, { css } from 'styled-components';

import { colorPalette } from '@uikits/colors/Color';

const errorInputStyle = css`
  border-color: ${colorPalette.red_100};
`;

export const StyleContainer = styled.div`
  width: 100%;
  height: 48px;
  background-color: inherit;
  position: relative;
  & span.input__prefix {
    position: absolute;
    right: 12px;
    top: 18px;
    & svg {
      font-size: 22px;
    }
  }
  & span.input__suffix {
    position: absolute;
    left: 12px;
    top: 18px;
    cursor: pointer;
    & svg {
      font-size: 22px;
    }
  }
`;

export const StyleInput = styled.input<{
  error?: boolean;
  hasPrefex?: any;
  hasSuffix?: any;
}>`
  outline: none;
  border: none;
  width: -webkit-fill-available;
  width: -moz-available;
  height: 100%;
  font-size: 14px;
  padding: ${(p) =>
    p.hasPrefex
      ? '0px 35px 0px 9px'
      : p.hasSuffix
      ? '0px 9px 0px 30px'
      : '0px 9px'};
  color: ${colorPalette.gray_300};
  background-color: inherit;
  border: 1px solid ${colorPalette.gray_200};
  border-radius: 4px;
  caret-color: ${colorPalette.gray_300};
  &::placeholder {
    font-size: 12px;
    color: ${colorPalette.gray_200};
  }
  &:focus {
    border: 1px solid ${colorPalette.gray_200};
  }

  ${(p) => p.error && errorInputStyle};
`;

export const StyleFormItemErrMsg = styled.p`
  width: 100%;
  font-size: 14px;
  padding-top: 4px;
  color: ${colorPalette.red_100};
`;
export const StyleTextArea = styled.textarea<{
  error?: boolean;
  hasPrefex?: any;
  hasSuffix?: any;
}>`
  outline: none;
  border: none;
  width: -webkit-fill-available;
  font-size: 15px;
  height: 100%;
  padding: 0.5rem 0.7rem;
  resize: none;
  color: ${colorPalette.gray_300};
  background-color: inherit;
  border: 1px solid ${colorPalette.gray_200};
  border-radius: 4px;
  caret-color: ${colorPalette.gray_300};
  &::placeholder {
    font-size: 12px;
    color: ${colorPalette.gray_200};
  }
  &:focus {
    border: 1px solid ${colorPalette.gray_200};
  }
  ${(p) => p.error && errorInputStyle};
`;
