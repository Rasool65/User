import { colorPalette } from '@uikits/colors/Color';
import styled, { css } from 'styled-components';
import {
  MediaQueryStyle,
  MediaQuerySizes,
  CustomSize,
} from '@utils/MediaQuery';

export const StyleSliderContainer = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  margin: 5px auto 30px auto;
  display: flex;
  justify-content: space-between;
  ${MediaQueryStyle.sm(css`
    flex-direction: column;
    justify-content: center;
  `)}
`;

export const StyleSlider = styled.div`
  height: 320px;
  position: relative;
  border-radius: 15px;
  flex-grow: 1;
  ${MediaQueryStyle.sm(css`
    width: 100%;
    margin-bottom: 20px;
  `)}
`;

export const StyleSliderImage = styled.div<{
  width?: string;
  height?: string;
  src?: any;
}>`
  background-image: url(${(props) => props.src});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 15px;
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '100%')};
`;

export const StyleSliderNav = styled.nav`
  border-radius: 0px 0px 15px 15px;
  background: rgba(255, 255, 255, 0.7);
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 0;
`;

export const StyleSliderNavTitle = styled.p`
  font-size: 22px;
  color: ${colorPalette.gray_260};
  padding: 0 30px 0 10px;
  ${MediaQueryStyle.sm(css`
    font-size: 20px;
  `)}
`;

export const StylePagination = styled.div`
  padding: 0 10px 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyleArrow = styled.div`
  padding-top: 2px;
  > img {
    cursor: pointer;
  }
`;

export const StylePaginationBullets = styled.div`
  display: flex;
  align-items: center;
`;

export const StyleBullet = styled.div<{ isActive?: boolean }>`
  width: ${(props) => (props.isActive ? '10px' : '7px')};
  height: ${(props) => (props.isActive ? '10px' : '7px')};
  transition: 0.1s;
  border-radius: 100%;
  margin: 0 2px;
  cursor: pointer;
  background: ${(props) =>
    props.isActive ? colorPalette.gray_100 : colorPalette.gray_80};
`;

export const StyleLeftSide = styled.div`
  padding: 0 30px 0 6px;
  justify-content: center;
  ${MediaQueryStyle.sm(css`
    width: 100%;
    padding: 0;
  `)}
`;

export const StyleBoxSearch = styled.div`
  height: 100px;
  border-radius: 15px;
  padding: 25px 20px;
  background: ${colorPalette.yellow_10};
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  ${MediaQueryStyle.customMinWidth(
    CustomSize.md,
    css`
      width: 90%;
    `
  )}
  ${MediaQueryStyle.sm(css`
    width: auto;
    margin: 0 0 15px 0;
  `)}
`;

export const StyleBoxSearchTitle = styled.p`
  font-size: 18px;
  color: ${colorPalette.gray_260};
  margin-bottom: 20px;
  ${MediaQueryStyle.sm(css`
    font-size: 16px;
  `)}
`;

export const StyleSearch = styled.div`
  width: 100%;
  div.search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    flex-grow: 0.6;
    > div {
      ${MediaQueryStyle.sm(css`
        width: 92% !important;
      `)}
    }
  }
  input {
    background: white;
    border-color: transparent;
    border-radius: 8px;
  }
  button {
    margin-top: 2px;
  }
`;
export const StyleSearchResult = styled.div`
  position: absolute;
  background: white;
  right: 0;
  top: 36px;
  width: 232px;
  border-radius: 3px;
  max-height: 300px;
  z-index: 1000;
  border: 1px solid ${colorPalette.gray_30};
  overflow: auto;
  ul {
    li {
      text-align: right;
    }
  }
`;

export const StyleBoxContact = styled.div`
  border-radius: 15px;
  padding: 25px 20px;
  height: 100px;
  background: ${colorPalette.green_20};
  display: flex;
  align-items: center;
  justify-content: center;
  ${MediaQueryStyle.customMinWidth(
    CustomSize.md,
    css`
      width: 90%;
    `
  )}
  ${MediaQueryStyle.sm(css`
    width: auto;
    margin: 0 0 15px 0;
  `)}
`;

export const StyleContactNum = styled.div`
  padding: 5px 30px;
  > p {
    font-size: 18px;
    color: ${colorPalette.gray_260};
    margin-bottom: 10px;
    ${MediaQueryStyle.sm(css`
      font-size: 16px;
    `)}
  }
`;
