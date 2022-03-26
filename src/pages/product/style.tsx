import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { CustomSize, MediaQueryStyle } from '@utils/MediaQuery';

export const SectionProduct = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  ${MediaQueryStyle.sm(css`
    display: block;
  `)}
`;

export const SectionRight = styled.aside`
  width: 35%;
  margin: 0 auto 20px auto;
  ${MediaQueryStyle.sm(css`
    width: 100%;
    margin: 0;
  `)}
`;

export const ProductImg = styled.div`
  border: 7px solid ${colorPalette.gray_10};
  border-radius: 9px;
  height: 353px;
  width: 100%;
  max-width: 410px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  > img {
    max-width: 100%;
    max-height: 100%;
  }
  ${MediaQueryStyle.sm(css`
    width: auto;
  `)}
`;

export const Album = styled.ul`
  display: flex;
`;

export const AlbumItem = styled.li<{ isActive?: boolean }>`
  border: ${(props) =>
    props.isActive
      ? '1px solid ' + colorPalette.red_650
      : '3px solid ' + colorPalette.gray_10};
  border-radius: 9px;
  cursor: pointer;
  width: 93px;
  height: 81px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    width: 44px;
    height: 57px;
  }
  > p {
    font-size: 10px;
    color: ${colorPalette.gray_70};
    > span {
      margin-right: 5px;
    }
  }
  ${MediaQueryStyle.sm(css`
    width: 85px;
    height: 70px;
  `)}
`;

export const SectionLeft = styled.main`
  width: 60%;
  margin: 0 auto 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    > section {
      h4 {
        margin: 20px 0;
        font-size: 30px;
        color: ${colorPalette.gray_260};
        ${MediaQueryStyle.sm(css`
          font-size: 22px;
        `)}
      }
      .divider {
        margin: 25px 0 5px 0;
        background: ${colorPalette.gray_30};
      }
    }
  }
  ${MediaQueryStyle.sm(css`
    width: 100%;
    margin: 20px 0 0 0;
  `)}
`;
export const Title = styled.p`
  font-size: 14px;
  color: ${colorPalette.gray_260};
  font-weight: bold;
  margin-bottom: 12px;
`;
export const Description = styled.p`
  font-size: 14px;
  color: ${colorPalette.gray_260};
  max-width: 70%;
  line-height: 22px;
`;
export const Cart = styled.div`
  display: flex;
  margin-bottom: 10px;
  > div {
    flex-grow: 0;
    height: 44px;
    width: 90px;
    > div {
      font-size: 20px;
    }
  }
`;
export const Price = styled.div`
  margin-bottom: 25px;
  > span {
    font-size: 18px;
    color: ${colorPalette.gray_90};
    ${MediaQueryStyle.sm(css`
      font-size: 16px;
    `)}
  }
  > span.price {
    font-size: 32px;
    color: ${colorPalette.green_350};
    margin: 0 8px;
    ${MediaQueryStyle.sm(css`
      font-size: 20px;
    `)}
  }
  span:last-child {
    color: ${colorPalette.green_350};
  }
`;
export const ShareProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
  border-radius: 9px;
  border: 2px solid ${colorPalette.gray_10};
  > p {
    font-size: 12px;
    color: ${colorPalette.gray_90};
  }
`;
export const Item = styled.div`
  margin-right: 20px;
  display: flex;
  cursor: pointer;
`;
export const Social = styled.div`
  display: flex;
  align-items: center;
`;
export const Details = styled.div`
  width: 100%;
  > section {
    margin-top: 40px;
  }
`;
export const Specifications = styled.div`
  font-size: 14px;
  color: ${colorPalette.gray_240};
  text-align: justify;
  line-height: 24px;
`;
export const ListItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 40px 0 60px 0;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 15px 45px;
    p {
      font-size: 14px;
      color: ${colorPalette.gray_260};
      margin: 0 10px 0 12px;
    }
    span {
      font-size: 14px;
      color: ${colorPalette.gray_80};
    }
  }
  ${MediaQueryStyle.sm(css`
    flex-direction: column;
    align-items: flex-start;
  `)}
`;

export const DialogCustom = styled.div`
  border-radius: 6px;
  padding: 0 20px 10px 20px;
  ${MediaQueryStyle.customMinWidth(
    CustomSize.lg,
    css`
      width: 865px;
    `
  )}
  ${MediaQueryStyle.customMaxWidth(
    CustomSize.md,
    css`
      width: 565px;
    `
  )}
    ${MediaQueryStyle.sm(css`
    width: 90%;
  `)}
`;

export const DialogTitle = styled.h2`
  padding: 25px 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colorPalette.gray_55};
  p {
    font-size: 20px;
    color: ${colorPalette.black_450};
    ${MediaQueryStyle.sm(css`
      font-size: 18px;
    `)}
  }
  > div {
    img {
      cursor: pointer;
    }
  }
`;

export const DialogContent = styled.section`
  display: flex;
  justify-content: space-between;
  min-height: 500px;
  overflow-y: hidden;
  ${MediaQueryStyle.customMaxWidth(
    CustomSize.lg,
    css`
      display: block;
    `
  )}
`;

export const DialogContentRight = styled.div`
  width: 47%;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    max-height: 460px;
    max-width: 100%;
    ${MediaQueryStyle.sm(css`
      max-height: 300px;
    `)}
  }
  ${MediaQueryStyle.customMaxWidth(
    CustomSize.lg,
    css`
      width: 70%;
      margin: 20px auto;
    `
  )}
  ${MediaQueryStyle.sm(css`
    width: 100%;
  `)}
`;

export const DialogContentLeft = styled.ul`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  max-height: 480px;
  overflow-y: hidden;
  > li {
    margin-bottom: 10px;
    ${MediaQueryStyle.sm(css`
      width: 80px;
      height: 80px;
    `)}
  }
  ${MediaQueryStyle.customMaxWidth(
    CustomSize.lg,
    css`
      width: 85%%;
      margin: 20px auto;
    `
  )}
  ${MediaQueryStyle.sm(css`
    width: 100%;
  `)}
`;

export const StyleShowPriceProduct = styled.button`
  flex: auto;
  border-radius: 6px;
  margin-bottom: 25px;
  width: 25%;
`;
