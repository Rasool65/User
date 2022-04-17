import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { CustomSize, MediaQueryStyle } from '@utils/MediaQuery';

export const SectionShoppingList = styled.section`
  width: 100%;
  position: relative;
  section {
    width: 100%;
    margin-top: 25px;
  }
`;

export const Loader = styled.div<{ visibility?: boolean }>`
  width: 100%;
  display: ${(p) => (p.visibility ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${colorPalette.white_5};
`;

export const ShoppingContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${MediaQueryStyle.sm(css`
    flex-direction: column;
  `)}
`;
export const Aside = styled.aside`
  width: 30%;
  margin-bottom: 20px;
  border-radius: 15px;
  border: 1px solid ${colorPalette.gray_30};
  margin-bottom: 20px;
  padding: 12px 20px;
  ${MediaQueryStyle.sm(css`
    width: 100%;
  `)}
`;

export const Content = styled.main`
  width: 65%;
  .loading {
    margin: 0 auto;
  }
  ${MediaQueryStyle.sm(css`
    width: 100%;
    margin-bottom: 30px;
  `)}
`;

export const TotalPrice = styled.div<{ disabled?: boolean }>`
  border-radius: 15px;
  background: ${colorPalette.gray_25};
  margin-bottom: 20px;
  padding: 25px 20px;
  button {
    margin: 0 auto;
    color: white;
    background: ${(props) => props.disabled && '#e69e9f'};
    border-color: ${(props) => props.disabled && '#e69e9f'};
  }
`;

export const PriceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  p {
    font-size: 14px;
    color: ${colorPalette.gray_90};
  }
  div {
    span:first-child {
      font-weight: bold;
      font-size: 16px;
      color: ${colorPalette.gray_260};
      margin: 0 8px;
    }
    span:last-child {
      font-size: 13px;
      color: ${colorPalette.gray_260};
    }
  }
`;

export const PriceDescription = styled.p`
  font-size: 12px;
  color: ${colorPalette.gray_260};
  line-height: 22px;
  text-align: justify;
  margin: 20px auto 25px auto;
`;

export const EmptyContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 2px solid ${colorPalette.gray_30};
  padding: 7px 0;
  align-items: center;
  border-radius: 15px;
  height: 230px;
  margin-bottom: 12px;
  p {
    font-size: 12px;
    color: ${colorPalette.gray_80};
    text-align: center;
  }
  h4 {
    font-size: 15px;
    font-weight: bold;
    color: ${colorPalette.gray_260};
    margin: 10px 0;
  }
`;

export const CartList = styled.ul``;

export const ListItem = styled.li`
  border: 1px solid ${colorPalette.gray_30};
  border-radius: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  padding: 12px 28px;
  ${MediaQueryStyle.sm(css`
    flex-direction: column;
    gap: 18px;
    padding: 12px 15px;
    .remove {
      display: none;
    }
    .name {
      width: 100%;
      gap: 10px;
      justify-content: unset;
    }
  `)}
`;
export const Option = styled.div`
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 45px;
  img {
    cursor: pointer;
  }
  > p {
    display: none;
  }
  ${MediaQueryStyle.sm(css`
    > p {
      display: block;
      line-height: 1.5;
    }
  `)}
`;

export const ItemContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
  p {
    font-size: 14px;
    font-weight: bold;
    min-width: 50%;
    color: ${colorPalette.gray_250};
  }
  > div:nth-child(2) {
    flex-grow: 0;
    width: 93px;
    div {
      font-weight: bold;
    }
  }
  .remov-xs {
    display: none;
  }
  ${MediaQueryStyle.sm(css`
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
    .remov-xs {
      display: flex;
    }
    > div:nth-child(2) {
      flex-grow: unset;
      width: fit-content;
    }
    > p {
      display: none;
    }
  `)}
`;

export const ItemContentPrice = styled.div`
  min-width: 20%;
  display: flex;
  flex-direction: row-reverse;
  span:first-child {
    font-size: 13px;
    color: ${colorPalette.gray_90};
  }
  span:last-child {
    font-weight: bold;
    font-size: 15px;
    color: ${colorPalette.gray_260};
    margin: 0 8px;
  }
  ${MediaQueryStyle.sm(css`
    min-width: 105px;
    justify-content: flex-end;
    span:last-child {
      margin-right: 0;
    }
  `)}
`;
export const AddressItem = styled.div`
  border: 1px solid ${colorPalette.gray_30};
  border-radius: 15px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  padding: 20px 25px;
  p {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 2px;
    color: ${colorPalette.gray_250};
    span:first-child {
      font-weight: normal;
    }
  }
  ${MediaQueryStyle.sm(css`
    flex-wrap: wrap;
    gap: 15px;
  `)}
`;

export const Addresses = styled.div`
  width: 100%;
  section {
    width: 100%;
  }
  ${MediaQueryStyle.sm(css`
    margin-bottom: 80px;
    section {
      flex-wrap: wrap;
      gap: 15px;
    }
  `)}
`;

export const SelectOption = styled.div`
  margin-left: 20px;
  height: 18px;
  width: 18px;
  position: relative;
  input {
    position: absolute;
    height: 18px;
    width: 18px;
    opacity: 0;
    z-index: 100;
  }
  .checkmark {
    position: absolute;
    top: 0;
    height: 18px;
    width: 18px;
    cursor: pointer;
    background-color: ${colorPalette.white};
    border: 1px solid ${colorPalette.gray_47};
    border-radius: 50%;
  }
  :hover input ~ .checkmark {
    background-color: ${colorPalette.white};
  }

  input:checked ~ .checkmark {
    background-color: ${colorPalette.white};
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    top: 5px;
    left: 5px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${colorPalette.red_650};
  }
`;
export const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid ${colorPalette.gray_30};
  border-radius: 15px;
  margin-bottom: 15px;
  align-items: center;
  padding: 16px 28px;
`;
export const ItemOptionContainer = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #707070;
  // min-width: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > p {
    margin-right: 1.5rem;
  }
`;
export const ProductOption = styled.p`
  min-width: 18rem;
`;

export const AsideItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
  justify-content: space-between;
`;
export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
