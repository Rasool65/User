import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { CustomSize, MediaQueryStyle } from '@utils/MediaQuery';

export const StylePreFactor = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid ${colorPalette.gray_40};
  border-radius: 15px;
  position: relative;
  min-height: 350px;
  margin: 70px auto 50px auto;
  padding: 30px 0;
  img {
    position: relative;
    top: -79px;
  }
`;

export const StylePreFactorContent = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  gap: 25px;
  h2 {
    font-size: 32px;
    color: ${colorPalette.black_440};
    line-height: 1.5;
    padding: 0 15px;
  }
  p {
    font-size: 20px;
    color: ${colorPalette.gray_260};
    line-height: 1.5;
    padding: 0 15px;
  }
  > div {
    > p {
      font-size: 17px;
      color: ${colorPalette.gray_250};
      margin-bottom: 20px;
      padding: 0 15px;
    }
    ul {
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 14px;
        padding: 0 15px;
        p {
          font-size: 16px;
          line-height: 1.5;
        }
        ${MediaQueryStyle.sm(css`
          flex-wrap: wrap;
        `)}
      }
    }
  }
  button {
    width: 160px;
  }
`;
