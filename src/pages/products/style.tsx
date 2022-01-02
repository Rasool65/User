import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { CustomSize, MediaQueryStyle } from '@utils/MediaQuery';

export const SectionProducts = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  ${MediaQueryStyle.sm(css`
    display: block;
  `)}
`;

export const Aside = styled.aside`
  width: 25%;
  margin: 0 auto 20px auto;
  ${MediaQueryStyle.sm(css`
    width: 100%;
  `)}
`;

export const Content = styled.main`
  width: 70%;
  margin: 0 auto;
  > div[type='image'] {
    margin: 0;
    height: 216px;
  }
  ${MediaQueryStyle.sm(css`
    width: 100%;
    > div[type='image'] {
      width: 100%;
    }
  `)}
`;

export const SearchBox = styled.div`
  background: ${colorPalette.gray_25};
  border-radius: 9px;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 18px 20px 13px;
  > div {
    flex-grow: 1;
    input {
      background: ${colorPalette.white};
      border: none;
      margin-left: 3px;
    }
  }
`;

export const CategoryProduct = styled.div`
  width: 100%;
  padding-top: 20px;
  background: ${colorPalette.gray_25};
  border-radius: 9px;
  max-height: fit-content;
  display: inline-table;
  > ul {
    padding: 0;
    > li {
      padding: 0;
      margin: 0;
      border-bottom: 1px solid ${colorPalette.gray_30};
      > p {
        padding: 17px 18px;
        color: ${colorPalette.gray_300};
      }
      img {
        display: block;
        margin-left: 17px;
        width: 16px;
        height: 16px;
      }
      > div {
        margin: 0;
        > div {
          padding: 0;
          > p {
            padding: 17px 18px;
            color: ${colorPalette.gray_300};
          }
        }
        > div:last-child {
          margin: 0;
          ul {
            background: ${colorPalette.gray_52};
            padding: 0 30px;
            margin-top: 5px;
            li {
              padding: 17px 0;
              color: ${colorPalette.gray_300};
              border-bottom: 1px solid ${colorPalette.gray_55};
            }
            > li:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
    > li:last-child {
      border-bottom: none;
    }
  }
`;

export const CategoryTitle = styled.h3`
  color: ${colorPalette.gray_300};
  font-size: 14px;
  padding: 0 18px;
  margin-bottom: 1rem;
`;

export const ContentNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  div.sort {
    position: relative;
  }
`;

export const NavFilter = styled.div`
  width: 111px;
  border: 1px solid ${colorPalette.gray_35};
  border-radius: 8px;
  display: flex;
  padding: 15px 20px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  > p {
    font-size: 12px;
    color: ${colorPalette.gray_90};
  }
  ${MediaQueryStyle.sm(css`
    width: 75px;
    padding: 10px 20px;
  `)}
`;
export const AllProducts = styled.div`
  display: grid;
  grid-column-gap: 8px;
  grid-row-gap: 15px;
  margin-bottom: 70px;
  ${MediaQueryStyle.customMinWidth(
    CustomSize.xl,
    css`
      grid-template-columns: repeat(4, 1fr);
    `
  )}
  ${MediaQueryStyle.customBetweenWidth(
    CustomSize.md,
    CustomSize.xl,
    css`
      grid-template-columns: repeat(3, 1fr);
    `
  )}
    ${MediaQueryStyle.customBetweenWidth(
    CustomSize.sm,
    CustomSize.md,
    css`
      grid-template-columns: repeat(2, 1fr);
    `
  )}
    ${MediaQueryStyle.customMaxWidth(
    CustomSize.sm,
    css`
      grid-template-columns: repeat(1, 1fr);
    `
  )}
    > div {
    width: 90%;
    margin: 0 auto;
  }
  .cart {
    flex-direction: row-reverse;
  }
`;

export const Pages = styled.div`
  margin-bottom: 60px;
`;

export const SubMenuItem = styled.li<{ isActive?: boolean }>`
  margin-top: 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  > a {
    text-decoration: none;
    > p {
      font-size: 13px;
      color: ${(props) =>
        props.isActive ? colorPalette.black_500 : colorPalette.gray_110};
      font-weight: ${(props) => (props.isActive ? 'bold' : '')};
    }
  }
  > span {
    background: ${(props) =>
      props.isActive ? colorPalette.black_500 : colorPalette.gray_110};
  }
`;

export const Bullet = styled.span`
  width: 5px;
  height: 5px;
  display: inline-block;
  margin-left: 10px;
  border-radius: 100%;
  background: ${colorPalette.gray_110};
`;

export const StyleBtnDropDown = styled.div`
  width: 151px;
  background: white;
  border: 1px solid ${colorPalette.gray_30};
  border-top-color: transparent;
  border-radius: 0 0 6px 6px;
  z-index: 1000;
  position: absolute;
  top: 44px;
  left: 0;
  ul > li {
    display: block;
    width: 100%;
    font-size: 12px;
  }
  ${MediaQueryStyle.sm(css`
    width: 115px;
  `)}
`;

export const EmptyBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-items: center;
  border-radius: 15px;
  margin-bottom: 12px;
  p {
    font-size: 12px;
    color: ${colorPalette.gray_80};
  }
  h4 {
    font-size: 15px;
    font-weight: bold;
    color: ${colorPalette.gray_260};
    margin: 10px 0;
  }
`;
