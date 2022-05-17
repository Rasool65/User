import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { MediaQueryStyle, CustomSize } from '@utils/MediaQuery';

export const StyleContainer = styled.div`
  background: white;
  padding: 15px 0;
`;

export const StyleProduct = styled.div`
  background: ${colorPalette.gray_15};
  padding: 7px 7px;
  border-radius: 10px;
  min-width: 187px;
  width: 90%;
  margin: 0 auto;
  a {
    text-decoration: none;
  }
`;

export const StyleImage = styled.div`
  background: ${colorPalette.white};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 10px;
  margin: 0 auto 20px auto;
  ${MediaQueryStyle.customMaxWidth(
    CustomSize.xs,
    css`
      height: 260px;
    `
  )}
`;

export const StyleProductImage = styled.div<{
  width?: string;
  height?: string;
  src?: any;
}>`
  background-image: url(${(props) => props.src});
  width: ${(props) => (props.width ? props.width : '220px')};
  height: ${(props) => (props.height ? props.height : '220px')};
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
`;

export const StyleProductTitle = styled.p`
  color: ${colorPalette.gray_300};
  text-align: right;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.5;
  min-height: 50px;
  direction: rtl;
`;

export const StyleAnchorTag = styled.a`
  text-decoration: none;
`;

export const StylePriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  direction: rtl;
  height: 37px;
  color: rgba(0, 0, 0, 0.4);
`;

export const StylePriceTitle = styled.span`
  font-weight: bold;
  padding-top: 8px;
  font-size: 14px;
`;

export const StylePrice = styled.span`
  color: ${colorPalette.green_350};
  font-weight: bold;
  padding-top: 8px;
  font-size: 14px;
`;

export const StylePriceContainer = styled.div`
  margin-bottom: 22px;
  justify-content: space-between;
  display: flex;
  width: 100%;
`;

export const StyleCartRow = styled.div<{ count?: any }>`
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => (props.count > 4 ? 'row' : 'row-reverse')};
  .countBtn {
    flex-direction: ${(props) => (props.count > 4 ? 'row-reverse' : 'row')};
  }
`;

export const StyleShowPrice = styled.button`
  flex: auto;
  background-color: ${colorPalette.gray_30};
  border-radius: 6px;
`;
