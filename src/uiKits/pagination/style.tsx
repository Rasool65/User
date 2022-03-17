import styled from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';

export const SectionPagination = styled.section`
  margin: 0 auto;
  text-align: center;
  > ul {
    direction: rtl;
    > li {
      font-size: 11px;
      color: ${colorPalette.gray_65};
      margin: 0 15px;
      cursor: pointer;
      display: inline-block;
    }
    li.selected {
      color: ${colorPalette.black_500};
      font-weight: bold;
    }
    li.dots {
      font-size: 20px;
    }
    li:first-child,
    li:last-child {
      padding: 8px 12px;
      border: 1px solid ${colorPalette.gray_30};
      border-radius: 7px;
      > span {
        margin: 0 5px;
      }
      > span.arrow {
        font-size: 20px;
        vertical-align: middle;
      }
    }
  }
  li:first-child.active,
  li:last-child.active {
    border: 1px solid ${colorPalette.gray_35};
    background: ${colorPalette.gray_35};
    > span {
      color: ${colorPalette.black_500};
    }
  }
`;
