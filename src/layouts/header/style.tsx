import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { MediaQueryStyle, CustomSize } from '@utils/MediaQuery';

export const StyleHeaderSection = styled.section<{ isHidden?: boolean }>`
  padding: 20px 0;
  background: white;
  display: ${(p) => (p.isHidden ? 'none' : 'flex')};
  justify-content: space-between;
  ${MediaQueryStyle.sm(css`
    flex-direction: row-reverse;
    align-items: center;
  `)}
`;

export const StyleHeaderRight = styled.div`
  display: flex;
  align-items: center;
  > ul {
    user-select: none;
  }
  div.menuIcon {
    display: none;
  }
  ${MediaQueryStyle.sm(css`
    flex-direction: row-reverse;
    flex-grow: 0.55;
    justify-content: space-between;
    > ul {
      display: none;
    }

    div.menuIcon {
      display: block;
    }
  `)}
`;

export const StyleHeaderLogo = styled.img`
  width: 77px;
  margin-left: 20px;
  cursor: pointer;
  ${MediaQueryStyle.sm(css`
    width: 57px;
    height: 34px;
  `)}
`;

export const StyleHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  ${MediaQueryStyle.sm(css`
    align-items: baseline;
    gap: 17px;
  `)}
`;

export const StyleHeaderBasket = styled.div`
  position: relative;
  cursor: pointer;
`;

export const StyleBasketCount = styled.div<{ visible?: boolean }>`
  position: absolute;
  cursor: pointer;
  width: 11px;
  height: 11px;
  color: #ea2125;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 15px;
  top: -5px;
  right: -1px;
  text-align: center;
  border-radius: 100%;
  display: ${(p) => (p.visible ? 'block' : 'none')};
`;

export const StyleUserBtn = styled.div`
  width: 163px;
  height: 46px;
  background: ${colorPalette.gray_15};
  border-radius: 9px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin: 0 30px 0 0;
  > svg {
    font-size: 12.5px;
  }
  ${MediaQueryStyle.sm(css`
    width: 25px;
    height: 25px;
    background: transparent;
    margin: 0;
    > img {
      display: none;
    }
  `)}
`;

export const StyleUserBtnTitle = styled.div`
  display: flex;
  align-items: center;
  > p {
    font-size: 13px;
    color: ${colorPalette.gray_90};
    margin: 0 8px;
  }
  ${MediaQueryStyle.sm(css`
    img {
      width: 20px;
      height: 23px;
    }
    p {
      display: none;
    }
  `)}
`;

export const StyleUserBtnDropDown = styled.div`
  width: 160px;
  background: white;
  border: 1px solid ${colorPalette.gray_30};
  border-top-color: transparent;
  border-radius: 0 0 9px 9px;
  z-index: 1000;
  position: absolute;
  top: 65px;
  left: 0;
  ul > li > a {
    display: block;
    width: 100%;
  }
  ${MediaQueryStyle.sm(css`
    width: 62px;
    top: 47px;
    right: 44px;
    border-radius: 9px 0 9px 9px;
    border-top-color: ${colorPalette.gray_30};
  `)}
`;

export const StyleSideNaveBg = styled.div<{ isHidden?: boolean }>`
  width: 100%;
  display: ${(props) => (props.isHidden ? 'block' : 'none')};
  height: 100%;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #00000033;
  transition: 0.4s;
`;

export const StyleSideNave = styled.div<{ isHidden?: boolean }>`
  width: ${(props) => (props.isHidden ? '90%' : 0)};
  height: 100%;
  position: fixed;
  z-index: 110;
  top: 0;
  left: 0;
  background-color: ${colorPalette.white};
  overflow-x: hidden;
  padding: 40px 0;
  transition: 0.5s;
  div.content {
    padding: 40px 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > ul {
      margin-bottom: 40px;
      li {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 40px;
      }
    }
  }
`;

export const StyleSideNaveLeft = styled.div<{ isHidden?: boolean }>`
  width: ${(props) => (props.isHidden ? '90%' : 0)};
  height: 100%;
  position: fixed;
  z-index: 110;
  top: 0;
  right: 0;
  background-color: ${colorPalette.white};
  overflow-x: hidden;
  padding: 40px 0;
  transition: 0.5s;
  .title-nav {
    flex-direction: row-reverse;
  }
  > div:last-child {
    width: 90%;
  }
`;

export const SideNaveTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
`;

export const StyleInfo = styled.ul`
  list-style: none;
  padding: 0;
`;

export const StyleInfoItem = styled.li`
  margin: 10px 2px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
`;

export const StyleInfoItemText = styled.p`
  margin: 0 15px;
  font-size: 14px;
  color: ${colorPalette.gray_95};
  line-height: 25px;
`;

export const StyleFooterImage = styled.div`
  height: 73px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  line-height: 25px;
`;

export const StyleFooterLogo = styled.img`
  width: 47px;
  height: 47px;
`;

export const StyleFooterTitle = styled.p`
  font-size: 15px;
  color: ${colorPalette.gray_80};
  margin: 0 15px;
`;


export const StyleMessageCount = styled.span<{ isHidden?: boolean }>`
    color: #ffffff;
    padding: 0.39em 0.4em;
    font-size: 50%;
    margin-left: 5px;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 50%;
    background-color: #16a059;
    width: 9px;
    top: 6px;
    right: 1px;
    position: absolute;
    display:${(props) => (props.isHidden ? 'none' : 'inline-block')};
`;

export const StyleMenuItemMessageCount = styled.span<{ isHidden?: boolean }>`
    color: #ffffff;
    padding: 0.35em 0.6em;
    font-size: 65%;
    margin-left: 5px;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    background-color: #a5a5a5;
    position: absolute;
    left: 0;
    display:${(props) => (props.isHidden ? 'none' : 'inline-block')};
`;

