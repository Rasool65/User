import { colorPalette } from '@uikits/colors/Color';
import styled, { css } from 'styled-components';
import { MediaQueryStyle, CustomSize } from '@utils/MediaQuery';

export const StyleBanner = styled.div<{
  width?: string;
  height?: string;
  smHeight?: string;
  background?: string;
  type?: string;
  backgroundSize?: string;
}>`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '271px')};
  background-image: url(${(props) => props.background});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: ${(props) =>
    props.backgroundSize ? props.backgroundSize : 'cover'};
  margin: 15px auto 25px auto;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  ::before {
    content: '';
    position: absolute;
    border-radius: 15px;
    top: 0;
    right: 0;
    width: 100%;
    background: ${(props) =>
      props.type === 'image' ? 'none' : 'rgba(255,255,255,0.7)'};
    height: 100%;
  }
  > div {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    > p {
      font-size: 27px;
      color: ${colorPalette.black_500};
      margin-bottom: 20px;
      ${MediaQueryStyle.sm(css<{ type?: string }>`
        text-align: center;
        font-size: 20px;
      `)}
    }
  }
  ${MediaQueryStyle.sm(css<{ type?: string; smHeight: string }>`
    height: ${(props) =>
      props.type === 'image'
        ? props.smHeight
          ? props.smHeight
          : '80px'
        : '271px'};
    width: 95%;
    margin-bottom: ${(props) => (props.smHeight ? '0' : '25px')};
  `)}
`;
