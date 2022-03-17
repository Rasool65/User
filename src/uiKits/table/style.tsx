import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';

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
  isPrint?: boolean;
}>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  p {
    color: ${colorPalette.gray_110};
    font-size: 13px;
    flex-grow: 1;
    display: ${(props) => (props.description ? 'inline-block' : 'none')};
  }
  > img {
    display: ${(props) => (props.isPrint ? 'inline-block' : 'none')};
    margin: 0 10px 0 20px;
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
  margin: 20px auto;
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  table {
    width: 100%;
    min-width: 560px;
    tr {
      font-size: 12px;
      color: ${colorPalette.gray_110};
      > th {
        text-align: right;
        padding: 20px 0;
      }
      > td {
        padding: 20px 0;
        min-width: 100px;
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
    tr:first-child {
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
