import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { MediaQueryStyle, CustomSize } from '@utils/MediaQuery';

export const CustomArrow = styled.div<{ type?: string; name?: string }>`
  display: flex;
  justify-content: center;
  width: 25px;
  height: 28px;
  z-index: 100;
  border-radius: 6px;
  padding: 0 5px;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: ${(props) => (props.name === 'category' ? '-23px' : '-36px')};
  left: ${(props) => (props.type === 'next' ? '144px' : '95px')};
  border: 1px solid ${colorPalette.gray_40};
  background: white;
  :hover {
    background: ${colorPalette.gray_12};
  }
  ::before {
    border-style: solid;
    border-width: 0.15em 0.15em 0 0;
    border-color: ${colorPalette.gray_60};
    content: '';
    display: inline-block;
    height: 0.3em;
    left: ${(props) => (props.type === 'next' ? '21%' : '30%')};
    position: relative;
    top: 35%;
    transform: ${(props) =>
      props.type === 'next' ? 'rotate(45deg)' : 'rotate(-135deg)'};
    vertical-align: top;
    width: 0.3em;
    color: ${colorPalette.white};
  }
  ${MediaQueryStyle.sm(css<{ type?: string; name?: string }>`
    top: ${(props) => (props.name === 'category' ? '-30px' : '-36px')};
    left: ${(props) => (props.type === 'next' ? '56px' : '9px')};
  `)}
`;

export const StyleCarousel = styled.div`
  ${MediaQueryStyle.sm(css<{ type?: string }>`
    padding-top: 40px;
  `)}
  .slick-track {
    margin: 0 !important;
  }
`;
