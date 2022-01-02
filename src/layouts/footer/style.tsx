import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { MediaQueryStyle, CustomSize } from '@utils/MediaQuery';

export const StyleFooterSection = styled.section<{ isHidden?: boolean }>`
  padding: 0 15px 10px 15px;
  background: white;
  display: ${(p) => (p.isHidden ? 'none' : 'block')};
`;

export const StyleFooterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  ${MediaQueryStyle.sm(css<{ type?: string }>`
    display: none;
  `)}
`;

export const StyleFooterImage = styled.div`
  width: 73px;
  height: 73px;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

export const StyleFooterLogo = styled.img`
  width: 73px;
  height: 73px;
`;

export const StyleFooterTitle = styled.p`
  font-size: 17px;
  color: ${colorPalette.gray_80};
  margin: 0 15px;
`;

export const StyleFooterContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyleInfo = styled.ul`
  list-style: none;
  padding: 0;
  ${MediaQueryStyle.sm(css<{ type?: string }>`
    display: none;
  `)}
`;

export const StyleInfoItem = styled.li`
  margin: 10px 2px;
  display: flex;
  align-items: center;
`;

export const StyleInfoItemText = styled.p`
  margin: 0 15px;
  font-size: 14px;
  color: ${colorPalette.gray_95};
  line-height: 25px;
`;

export const StyleOptions = styled.div`
  min-width : 120px;
  display: flex;
  align-items: center;
  ${MediaQueryStyle.sm(css<{ type?: string }>`
    display: none;
  `)}
`;

export const StyleSocial = styled.div`
  ${MediaQueryStyle.sm(css<{ type?: string }>`
    margin-top: 20px;
  `)}
`;

export const StyleSocialTitle = styled.p`
  font-size: 12px;
  color: ${colorPalette.gray_90};
  margin-bottom: 10px;
  margin-right: 15px;
  margin-top : 35px;
`;

export const StyleInputGroup = styled.div`
  display: flex;
  margin-right: 15px;
  margin-top : 15px;
  align-items: center;
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const StyleSocialIcons = styled.div`
  display: flex;
  align-items: center;
`;

export const SocialIcon = styled.div`
  display: inline-block;
  margin: 0 8px;
  cursor: pointer;
`;
