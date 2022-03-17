import styled from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';

export const StyleMenu = styled.ul<{
  color?: string;
  typeItem?: string;
  size?: string;
}>`
  padding: 5px 5px;
  list-style: none;
  display: flex;
  justify-content: space-around;
  flex-direction: ${(props) => {
    if (props.typeItem === 'Horizontal') {
      return 'row';
    } else if (props.typeItem === 'Vertical') {
      return 'column';
    }
  }};
  > li {
    > a {
      color: ${(props) => (props.color ? props.color : colorPalette.gray_90)};
      text-decoration: none;
    }
    color: ${(props) => (props.color ? props.color : colorPalette.gray_90)};
    font-size: ${(props) => (props.size ? props.size : '14px')};
    margin: ${(props) => {
      if (props.typeItem === 'Horizontal') {
        return '0 10px';
      } else if (props.typeItem === 'Vertical') {
        return '8px 5px';
      }
    }};
  }
`;

export const StyleMenuItem = styled.li`
  cursor: pointer;
`;
