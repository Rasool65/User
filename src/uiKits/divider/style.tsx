import styled from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';

export const StyleDivider = styled.div<{
  Type?: string;
  Width?: string;
  Height?: string;
  Background?: string;
}>`
  width: ${(props) => {
    if (props.Type === 'Vertical') {
      return props.Width ? props.Width : '2px';
    } else if (props.Type === 'Horizontal') {
      return props.Width ? props.Width : '100%';
    }
  }};
  height: ${(props) => {
    if (props.Type === 'Vertical') {
      return props.Height ? props.Height : '100%';
    } else if (props.Type === 'Horizontal') {
      return props.Height ? props.Height : '2px';
    }
  }};
  margin: ${(props) => {
    if (props.Type === 'Vertical') {
      return 'auto 10px';
    } else if (props.Type === 'Horizontal') {
      return '10px auto';
    }
  }};
  background-color: ${(props) =>
    props.Background ? props.Background : colorPalette.gray_50};
`;
