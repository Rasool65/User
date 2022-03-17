import { colorPalette } from '@uikits/colors/Color';
import styled, { css } from 'styled-components';
import { CustomSize, MediaQueryStyle } from '@utils/MediaQuery';

export const StyleContainer = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  ${MediaQueryStyle.sm(css`
    display: block;
    height: 100%;
  `)}
`;

export const StyleLogin = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 44px 88px 0px 93px;
  position: relative;
  background-color: ${colorPalette.white};
  ${MediaQueryStyle.sm(css`
    width: auto;
    height: 100%;
    padding: 85px 30px 95px 30px;
    display: block;
    z-index: 100;
    background: #ffffffe6;
  `)}
`;

export const StyleTitle = styled.p`
  padding-top: 70px;
  padding-bottom: 8px;
  font-size: 20px;
  font-weight: bold;
  ${MediaQueryStyle.sm(css`
    padding-top: 19px;
  `)}
`;
export const StyleSubTitle = styled.p`
  padding-bottom: 39px;
  font-size: 14px;
  color: ${colorPalette.gray_90};
  line-height: 1.5;
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 100%);
  grid-gap: 29px;
  width: 100%;
`;

export const StyleNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 5px;
`;

export const StyleValidateCode = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin: 10px 0;
  > div {
    margin: 0 10px 0 0px;
  }
`;

export const StyleTextLink = styled.span`
  font-size: 12px;
  color: ${colorPalette.gray_90};
  text-decoration: underline;
  cursor: pointer;
  ${MediaQueryStyle.sm(css`
    font-size: 11px;
  `)}
`;

export const StyleTextForget = styled(StyleTextLink)`
  text-decoration: none;
`;

export const StyleBtns = styled.div`
  display: grid;
  grid-template-columns: 200px 156px;
  grid-gap: 10px;
  justify-content: end;
  margin-top: 30px;
  ${MediaQueryStyle.sm(css`
    display: flex;
    justify-content: space-between;
    button {
      margin: 0;
    }
  `)}
`;

export const StyleAvatar = styled.div<{ src?: any }>`
  width: 60%;
  height: 100%;
  background-image: url(${(props) => (!!props.src ? props.src : '')});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-attachment: scroll;
  ${MediaQueryStyle.sm(css`
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `)}
`;
export const StyleSupport = styled.div`
  p {
    font-size: 12px;
    color: ${colorPalette.gray_240};
    margin: 20px 0 12px 0;
  }
`;
