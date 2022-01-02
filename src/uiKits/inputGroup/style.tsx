import styled from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';

export const InputContainer = styled.div`
  margin-bottom: 10px;
  > label {
    display: block;
    font-size: 14px;
    color: ${colorPalette.gray_80};
    margin-bottom: 12px;
  }
`;

export const StyleInput = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : '100%')};
  border: 1px solid ${colorPalette.gray_35};
  height: 45px;
  background: ${colorPalette.white};
  padding: 0 10px;
  > input {
    width: 100%;
    height: 100%;
    font-size: 12px;
    color: ${colorPalette.black_450};
    background: transparent;
    ::placeholder {
      color: ${colorPalette.gray_52};
    }
    :focus-visible {
      outline: unset;
    }
  }
`;
