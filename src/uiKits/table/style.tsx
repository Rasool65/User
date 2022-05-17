import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { MediaQueryStyle } from '@utils/MediaQuery';

export const StyleHeader = styled.div`
  padding: 12px 20px 5px 20px;
  h2 {
    color: ${colorPalette.gray_110};
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
  }
`;

export const StyleDescription = styled.div<{
  description?: string;
}>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  p {
    color: ${colorPalette.gray_110};
    font-size: 13px;
    flex-grow: 1;
    display: ${(props) => (props.description ? 'inline-block' : 'none')};
  }
`;
export const StylePrintWidget = styled.div<{ isPrint?: boolean }>`
  > img {
    display: ${(props) => (props.isPrint ? 'inline-block' : 'none')};
    margin: 0 10px 0 20px;
    cursor: pointer;
  }
`;
// export const StyleSortWidget = styled.div<{ isSort?: boolean }>`
//   > img {
//     display: ${(props) => (props.isSort ? 'inline-block' : 'none')};
//     margin: 0 0 0 20px;
//     cursor: pointer;
//   }
// `;
export const StyleExportWidget = styled.div<{ isExport?: boolean }>`
  > img {
    display: ${(props) => (props.isExport ? 'inline-block' : 'none')};
    margin: 0 0 0 20px;
    cursor: pointer;
  }
`;
export const StyleSearchBox = styled.div<{ isSearch?: boolean }>`
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${colorPalette.gray_35};
  border-radius: 8px;
  padding: 2px 15px;
  width: 157px;
  display: ${(props) => (props.isSearch ? 'flex' : 'none')};
  input {
    font-size: 12px;
    padding: 8px 0;
    :focus-visible {
      outline: unset;
    }
  }
  > img {
    display: block;
  }
`;

export const StyleTable = styled.div`
  margin-bottom: 20px;
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  table {
    width: 100%;
    /* min-width: 560px; */
    tr {
      font-size: 12px;
      color: ${colorPalette.gray_110};
      > th {
        text-align: right;
        padding: 20px 0;
      }
      > td {
        padding: 20px 0;
        min-width: 50px;
        > button {
          font-size: 10px;
          color: ${colorPalette.black_440};
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
        }
        > div {
          > img {
            vertical-align: middle;
            margin: 0 8px;
            cursor: pointer;
          }
        }
      }
      th:first-child,
      td:first-child {
        padding-right: 20px;
        min-width: 40px;
      }
    }
    tHead tr:first-child {
      border-bottom: 1px solid ${colorPalette.gray_52};
    }
    tr:nth-child(even) {
      background: ${colorPalette.gray_12};
    }
    .loading {
      padding: 20px 5px !important;
      text-align: center;
      color: #276dc3;
      font-weight: bold;
    }
  }
`;

export const Accepted = styled.p`
  color: #69d618;
  font-size: 14px;
  font-weight: bold;
`;

export const Delivered = styled.p`
  color: ${colorPalette.orange_100};
  font-size: 14px;
  font-weight: bold;
`;

export const Pending = styled.p`
  color: ${colorPalette.blue_100};
  font-size: 14px;
  font-weight: bold;
`;

export const Reject = styled.p`
  color: ${colorPalette.red_650};
  font-size: 14px;
  font-weight: bold;
`;

// export const StyleSortDropDown = styled.div`
//   cursor: pointer;
//   // box-sizing: border-box;
//   border: 1px solid #898989;
//   margin-left: auto;
//   width: 160px;
//   background: white;
//   border: 1px solid ${colorPalette.gray_30};
//   border-top-color: transparent;
//   border-radius: 0 0 9px 9px;
//   z-index: 1000;
//   position: inherit;
//   top: 65px;
//   left: 0;
//   ul > li > a {
//     display: block;
//     width: 100%;
//   }
//   ${MediaQueryStyle.sm(css`
//     width: 62px;
//     top: 47px;
//     right: 44px;
//     border-radius: 9px 0 9px 9px;
//     border-top-color: ${colorPalette.gray_30};
//   `)}
// `;
