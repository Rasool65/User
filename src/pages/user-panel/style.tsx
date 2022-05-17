import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { CustomSize, MediaQueryStyle } from '@utils/MediaQuery';

export const StyleUserpanelWrraper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 25px;
  ${MediaQueryStyle.md(
    css`
      flex-direction: column;
    `
  )}
  ${MediaQueryStyle.sm(css`
    flex-direction: column;
    margin-top: 0;
  `)}
    div.menuIcon {
    border: 1px solid ${colorPalette.gray_40};
    padding: 10px;
    width: 25px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
    display: none;
    ${MediaQueryStyle.sm(css`
      display: flex;
    `)}
  }
`;

export const StyleSidebar = styled.div`
  width: 25%;
  ${MediaQueryStyle.md(
    css`
      width: 100%;
      margin: 0 auto;
    `
  )}
  ${MediaQueryStyle.sm(css<{ type?: string }>`
    width: 100%;
  `)}
`;

export const SidebarHeader = styled.div`
  padding: 10px 10px;
  display: flex;
  align-items: center;
`;

export const ProfileImg = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 100%;
  border: 4px solid ${colorPalette.gray_45};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const ProfileName = styled.div`
  margin: 0 12px;
  flex-grow: 1;
  h6 {
    font-size: 15px;
    color: ${colorPalette.gray_110};
    margin-bottom: 15px;
  }
  p {
    font-size: 12px;
    color: ${colorPalette.gray_95};
    > span:nth-child(2) {
      margin: 0 5px;
    }
  }
`;

export const StyleBtns = styled.div`
  border-top: 1px solid ${colorPalette.gray_45};
  border-bottom: 1px solid ${colorPalette.gray_45};
  display: flex;
  margin: 10px 0;
  > div.password {
    border-left: 1px solid ${colorPalette.gray_45};
  }
`;

export const StyleItem = styled.div`
  display: flex;
  width: 50%;
  text-align: center;
  justify-content: center;
  padding: 14px 0;
  align-items: center;
  cursor: pointer;
  p {
    margin-left: 5px;
    font-weight: bold;
    font-size: 12px;
  }
`;

export const StyleMenu = styled.ul`
  padding: 10px 0 10px 0;
`;

export const StyleMenuItem = styled.li<{ isActive?: boolean }>`
  font-size: 14px;
  font-weight: bold;
  padding: 5px 20px 5px 5px;
  margin: 20px 0;
  cursor: pointer;
  border-right: ${(props) =>
    props.isActive ? '3px solid ' + colorPalette.red_650 : ''};
  > a {
    color: ${(props) =>
      props.isActive ? colorPalette.black_500 : colorPalette.gray_63};
    text-decoration: none;
  }
  > div {
    margin: 0;
    > div:first-child {
      padding: 0;
      > p {
        font-size: 14px;
        color: ${(props) =>
          props.isActive ? colorPalette.black_500 : colorPalette.gray_63};
        font-weight: ${(props) => (props.isActive ? 'bold' : '')};
      }
    }
    > div:last-child {
      margin: 0;
    }
  }
`;

export const SubMenu = styled.ul`
  padding: 5px 0;
`;

export const SubMenuItem = styled.li<{ isActive?: boolean }>`
  margin-top: 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 8px;
  > a {
    text-decoration: none;
    > p {
      font-size: 13px;
      color: ${(props) =>
        props.isActive ? colorPalette.black_500 : colorPalette.gray_110};
      font-weight: ${(props) => (props.isActive ? 'bold' : '')};
    }
  }
  > span {
    background: ${(props) =>
      props.isActive ? colorPalette.black_500 : colorPalette.gray_110};
  }
`;

export const Bullet = styled.span`
  width: 5px;
  height: 5px;
  display: inline-block;
  margin-left: 10px;
  border-radius: 100%;
  background: ${colorPalette.gray_110};
`;

export const StyleContent = styled.div`
  width: 72%;
  ${MediaQueryStyle.md(
    css`
      width: 100%;
      margin: 0 auto;
    `
  )}
  ${MediaQueryStyle.sm(css`
    width: 100%;
  `)}
`;

export const StyleTitle = styled.h5`
  font-size: 14px;
  font-weight: bold;
  color: ${colorPalette.gray_110};
  margin: 25px auto 25px auto;
  padding: 0 25px;
`;

export const StyleRow = styled.div`
  padding: 0 25px;
  margin: 20px auto 30px auto;
  > button {
    margin-right: 0;
  }
  > form {
    width: 100%;
    display: grid;
    grid-gap: 24px;
    ${MediaQueryStyle.xl(
      css`
        grid-template-columns: repeat(3, 1fr);
      `
    )}
    ${MediaQueryStyle.lg(
      css`
        grid-template-columns: repeat(2, 1fr);
      `
    )}
        ${MediaQueryStyle.xs(
      css`
        grid-template-columns: repeat(1, 1fr);
      `
    )}
  }
`;

export const StylePages = styled.div`
  width: 100%;
  margin: 30px auto 25px auto;
`;

export const Message = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${colorPalette.gray_110};
  padding: 25px 25px 25px 25px;
  ${MediaQueryStyle.sm(css<{ type?: string }>`
    text-align: justify;
    line-height: 25px;
  `)}
`;

export const FormRow = styled.div`
  margin-top: 15px;
  padding: 0 25px;
  display: grid;
  grid-gap: 18px;
  grid-template-columns: repeat(2, 1fr);
  ${MediaQueryStyle.sm(
    css`
      grid-template-columns: repeat(1, 1fr);
    `
  )}
  > div {
    /* margin-bottom: 15px; */
    width: 100%;
  }
`;

export const LabelRow = styled.div`
  margin-top: 15px;
  padding: 0 25px;
  display: block;
  font-size: 14px;
  > div {
    /* margin-bottom: 15px; */
    width: 100%;
  }
  label {
    margin-left: 8px;
  }
`;

export const FormRowPass = styled.div`
  margin-top: 30px;
  padding: 0 25px;
  > div {
    margin-bottom: 30px;
    width: 90%;
  }
`;

export const Notif = styled.div`
  display: flex;
  padding: 15px 25px 3px 25px;
  > i {
    width: 7px;
    height: 7px;
    display: inline-block;
    background: ${colorPalette.red_650};
    border-radius: 100%;
    margin: 8px 0 0 8px;
  }
  p {
    font-size: 14px;
    line-height: 22px;
    color: ${colorPalette.gray_95};
    max-width: 530px;
  }
`;

export const AddressBox = styled.div`
  width: 90%;
  margin: 0 auto 20px auto;
  padding: 30px 25px;
  border: 1px solid ${colorPalette.gray_35};
  h5 {
    font-size: 15px;
    color: ${colorPalette.black_450};
    margin-bottom: 15px;
  }
  p {
    font-size: 13px;
    color: ${colorPalette.gray_300};
  }
  ${MediaQueryStyle.sm(css<{ type?: string }>`
    width: auto;
    margin: 20px 15px;
  `)}
`;

export const PriceRow = styled.div`
  padding: 20px 25px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  > p {
    font-size: 14px;
    color: ${colorPalette.gray_110};
    flex-grow: 1;
    padding: 12px 0;
  }
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  > p {
    color: ${colorPalette.green_350};
    span:first-child {
      font-size: 22px;
      font-weight: bold;
      margin: 0 5px;
    }
    span:last-child {
      font-size: 15px;
      margin-left: 8px;
    }
  }
`;

export const StyleMessages = styled.div`
  padding: 0 25px;
`;

export const MessagesTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  h4 {
    color: ${colorPalette.gray_110};
    font-size: 13px;
    margin-bottom: 10px;
  }
`;

export const NewMessage = styled.div`
  padding: 0 25px;
  form {
    margin-top: 15px;
    div > div > span:last-child {
      font-size: 12px;
      color: ${colorPalette.gray_70};
    }
  }
`;
export const BtnsRow = styled.div`
  width: 100%;
  display: flex;
  margin: 28px 25px;
  button {
    margin: 0 0 0 15px;
  }
`;
export const StyleConversation = styled.div`
  padding: 0 25px;
  ul {
    max-height: 500px;
    overflow: auto;
    li {
      margin-bottom: 20px;
      > p {
        padding: 20px;
        width: fit-content;
        line-height: 23px;
        font-size: 14px;
        color: ${colorPalette.black_440};
        position: relative;
        text-align: justify;
      }
    }
  }
`;
export const StyleQuestion = styled.li`
  > p {
    border-radius: 12px 12px 0 12px;
    background: ${colorPalette.green_5};
    position: relative;
    ::before {
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 20px 15px 0;
      border-color: transparent ${colorPalette.green_5} transparent transparent;
      position: absolute;
      right: 0;
      bottom: -14px;
    }
  }
  > span {
    direction: ltr;
    position: relative;
    top: 3px;
    left: -17px;
    z-index: 5;
    color: transparent;
    font-size: 10px;
    display: table;
    width: 150px;
  }
  > p:hover + span {
    color: #c1c1c1;
  }
`;

export const StyleAnswer = styled.li`
  display: flex;
  flex-direction: row-reverse;
  padding-right: 15px;
  padding-left: 15px;
  position: relative;
  > p {
    border-radius: 12px 12px 12px 0;
    background: ${colorPalette.gray_12};
    ::before {
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 15px 20px 0 0;
      border-color: ${colorPalette.gray_12} transparent transparent transparent;
      position: absolute;
      left: 0;
      bottom: -14px;
    }
  }
  > span {
    direction: ltr;
    position: absolute;
    bottom: -12px;
    left: -42px;
    z-index: 5;
    color: transparent;
    font-size: 10px;
    display: table;
    width: 150px;
  }
  > p:hover + span {
    color: #c1c1c1;
  }
`;

export const StyleTextarea = styled.div`
  margin: 25px 0 10px 0;
  label {
    font-size: 12px;
    color: ${colorPalette.gray_70};
    margin-bottom: 10px;
    display: block;
  }
  textarea {
    width: 100%;
    height: 322px;
    border: 1px solid ${colorPalette.gray_63};
    resize: none;
    border-radius: 5px;
    :focus-visible {
      outline: none;
    }
  }
  .border-red {
    border-color: #ea2125;
  }
  .error {
    width: 100%;
    font-size: 14px;
    padding-top: 4px;
    color: #ea2125;
  }
`;

export const StyleTable = styled.div`
  width: 100%;
  overflow-x: auto;
  ${MediaQueryStyle.sm(css<{ type?: string }>`
    width: 101%;
  `)}
  .loading {
    padding: 20px 5px !important;
    text-align: center;
    color: #276dc3;
    font-weight: bold;
  }
  table {
    width: 100%;
    min-width: 560px;
    border-collapse: separate;
    border-spacing: 0 15px;
    tr {
      color: ${colorPalette.gray_110};
    }
    > thead {
      th {
        background: ${colorPalette.white};
        color: ${colorPalette.gray_110};
        text-align: right;
        padding: 0 20px;
        font-size: 13px;
      }
    }
    > tbody {
      tr {
        font-size: 14px;
        outline: 1px solid ${colorPalette.gray_47};
        td {
          padding: 30px 20px;
        }
        td:first-child {
          border-right: 1px solid ${colorPalette.gray_47};
          width: 20px;
        }
        td:last-child {
          width: 50px;
          border-left: 1px solid ${colorPalette.gray_47};
          padding: 0;
          position: relative;
        }
      }
      tr:nth-child(even) {
        background: ${colorPalette.gray_12};
      }
    }
  }
`;

export const StyleOptions = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    > img {
      cursor: pointer;
    }
  }
  div:first-child {
    background: ${colorPalette.gray_47};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50%;
  }
  div:last-child {
    background: ${colorPalette.white};
    border-right: 1px solid ${colorPalette.gray_47};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 50%;
  }
`;
export const Loading = styled.p`
  width: 100%;
  margin: 30px auto;
  text-align: center;
  color: #1d6ad4;
  font-size: 14px;
  font-weight: bold;
`;

export const StatusMode = styled.div<{ colorType?: string }>`
  width: 100%;
  color: ${(props) =>
    props.colorType ? props.colorType : colorPalette.gray_260};
  font-size: 14px;
  border-radius: 20px;
  font-weight: bold;
`;

export const EmptyBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 7px 0;
  align-items: center;
  border-radius: 15px;
  height: 230px;
  margin-bottom: 12px;
  p {
    font-size: 12px;
    color: ${colorPalette.gray_80};
    ${MediaQueryStyle.sm(css<{ type?: string }>`
      text-align: center;
    `)}
  }
  h4 {
    font-size: 15px;
    font-weight: bold;
    color: ${colorPalette.gray_260};
    margin: 10px 0;
  }
`;

export const StylePaymentList = styled.main`
  padding: 20px 15px;
`;
export const StyleTitlePayment = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 30px;
  gap: 12px;
  h4 {
    font-size: 14px;
    font-weight: bold;
    color: ${colorPalette.gray_110};
    margin-top: 12px;
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    p {
      font-size: 14px;
      cursor: pointer;
      color: ${colorPalette.gray_90};
      display: flex;
      gap: 3px;
      align-items: center;
    }
    ${MediaQueryStyle.sm(css<{ size?: any }>`
      align-items: baseline;
    `)}
  }
`;

export const StyleProgress = styled.div<{ size?: any }>`
  display: flex;
  padding: 5px 10px;
  gap: 5px;
  position: relative;
  div.item {
    display: flex;
    align-items: center;
    p {
      cursor: pointer;
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: ${(p) => (p.size ? p.size.W : '127px')};
    height: 100%;
    border-radius: 11px;
    border: 1px solid ${colorPalette.gray_55};
  }
  ${MediaQueryStyle.sm(css<{ size?: any }>`
    flex-direction: column;
    gap: 10px;
    div:nth-child(even) {
      display: none;
    }
    &:before {
      width: 144px;
      height: ${(p) => (p.size ? p.size.H : '30px')};
    }
  `)}
`;

export const StyleOrders = styled.section`
  display: flex;
  gap: 10px;
  ${MediaQueryStyle.sm(css`
    flex-direction: column;
  `)}
`;

export const StyleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`;

export const StyleColumnTitle = styled.h4`
  font-size: 12px;
  margin-bottom: 12px;
  color: ${colorPalette.gray_110};
`;

export const StyleMenuItems = styled.ul`
  li:nth-child(odd) {
    background-color: ${colorPalette.gray_12};
  }
  li:nth-child(even) {
    background-color: ${colorPalette.white};
  }
  .deleted {
    p,
    span {
      color: red !important;
    }
  }
`;
export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  div:not(.icon) {
    display: flex;
    padding: 12px 10px;
    align-items: center;
    min-height: 45px;
    flex-grow: 1;
    width: 45%;
    span,
    p {
      font-size: 13px;
      color: ${colorPalette.gray_110};
    }
  }
  div.rigth {
    gap: 12px;
    img {
      width: 32px;
      height: 32px;
    }
    p.name {
      max-width: 100px;
    }
  }
  div.left {
    justify-content: space-between;
    gap: 20px;
  }
`;

export const StylePriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  p {
    font-size: 15px;
    color: ${colorPalette.black_440};
  }
  p.finalPrice {
    font-weight: bold;
    color: ${colorPalette.green_350};
  }
  p.final {
    font-weight: bold;
    color: ${colorPalette.black_500};
  }
`;

export const StyleSideNaveLeft = styled.div<{ isHidden?: boolean }>`
  width: ${(props) => (props.isHidden ? '90%' : 0)};
  height: 100%;
  position: fixed;
  z-index: 110;
  top: 0;
  right: 0;
  background-color: ${colorPalette.white};
  overflow-x: hidden;
  padding: 40px 0;
  transition: 0.5s;
  .title-nav {
    flex-direction: row-reverse;
  }
  > div:last-child {
    width: 90%;
  }
  > div > section {
    border: none;
    margin-bottom: 50px;
  }
`;

export const RepeatOrder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 25px;
  p {
    font-size: 15px;
    color: ${colorPalette.black_450};
  }

  ${MediaQueryStyle.sm(css<{ size?: any }>`
    flex-direction: column;
    gap: 10px;
    p {
      text-align: center;
    }
  `)}
`;

export const SideNaveTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
`;

export const StyleSideNaveBg = styled.div<{ isHidden?: boolean }>`
  width: 100%;
  display: ${(props) => (props.isHidden ? 'block' : 'none')};
  height: 100%;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #00000033;
  transition: 0.4s;
`;
export const StyleLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
`;

export const SelectOption = styled.div`
  margin-left: 8px;
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
    background-color: ${colorPalette.green_350};
  }
`;
