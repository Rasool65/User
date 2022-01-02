import styled from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';

export const StyleCollapse = styled.div`
  width: 100%;
  margin: 35px auto 20px auto;
`;

export const CollapseHeader = styled.div<{ menu?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  > span,
  > img {
    display: ${(props) => (props.menu ? 'none' : '')};
  }
`;

export const CollapseTitle = styled.p`
  font-size: 16px;
  color: ${colorPalette.gray_250};
  flex-grow: 1;
`;

export const TitleBullet = styled.span`
  width: 7px;
  height: 7px;
  display: inline-block;
  border-radius: 100%;
  margin-left: 15px;
  background: ${colorPalette.gray_250};
`;

export const CollapseContent = styled.div<{ ref?: any }>`
  max-height: 0;
  text-align: justify;
  margin-top: 20px;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
`;
