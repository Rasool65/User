import { colorPalette } from '@uikits/colors/Color';
import styled from 'styled-components';

export const PageTitleContainer = styled.div`
  > h3 {
    margin: 1rem 0.3rem 0.5rem 0.3rem;
  }
`;
export const PageDescribeContainer = styled.div`
  margin: 2.3rem 0 1.5rem 0;
  > p {
    line-height: 24px;
  }
`;
export const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem 1rem 1rem;
  > h3 {
    padding: 1rem 0 0.3rem 0;
    color: #535353;
  }
  > p {
    line-height: 23px;
    color: #535353;
    margin: 0.4rem 0.2rem 2rem 0.2rem;
  }
`;
export const Term = styled.div``;
export const ClickableTitleCotainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0.5rem;
`;
export const ClickableTitle = styled.a`
  margin: 0.3rem 0;
  color: ${colorPalette.red_100};
  font-size: 1.43rem;
  padding: 0.4rem 0.7rem;
  border-bottom: 1px dashed ${colorPalette.red_100};
  cursor: pointer;
  text-decoration: none;
  width: fit-content;
`;
