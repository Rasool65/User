import { MediaQueryStyle } from '@utils/MediaQuery';
import styled, { css } from 'styled-components';

export const ContactUsRow = styled.div`
  margin: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const FormContainer = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  flex-direction: column;
  ${MediaQueryStyle.sm(css`
    padding: 1rem 1rem;
  `)}
`;
export const FormItemContainer = styled.div<{
  width?: string;
}>`
    display: flex;
    width:${(props) => (props.width === 'half' ? '50%' : '100%')};
    flex-direction: row;
    > div {
        margin: .9rem 0.5rem;
      }
    }
    ${MediaQueryStyle.md(css`
      flex-direction: column;
      width: 100%;
    `)}
`;
export const InputContainer = styled.div`
  display: flex;
  ${MediaQueryStyle.sm(css`
    flex-direction: column;
  `)};
`;

export const InputWithLabel = styled.div`
  margin: 0.8rem 0.7rem 0.8rem;
  flex-basis: 50%;
  > p {
    font-size: 0.9rem;
    padding: 0 5px 5px 0;
  }
`;

export const BtnContainer = styled.div`
  padding: 1.4rem 0;
  align-self: flex-end;
  ${MediaQueryStyle.sm(css`
    margin-top: 0.5rem;
    align-self: center;
  `)}
`;
export const MapInfoContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  justify-content: center;
  ${MediaQueryStyle.md(css`
    flex-direction: column;
    margin: 0.5rem 0;
  `)}
`;
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 40%;
  justify-content: center;
  padding: 1rem 0.4rem 1rem 0.7rem;
  ${MediaQueryStyle.md(css`
    margin: 0.5rem 0 1rem 0;
    padding: 0.5rem 0.4rem;
  `)}
`;
export const InfoItem = styled.div`
  margin: 0.8rem 0.2rem;
  > h3 {
    padding-bottom: 0.6rem;
  }
  > p {
    line-height: 23px;
  }
`;
export const MapContainer = styled.div`
  flex-basis: 50%;
  margin: 1.2rem 0.7rem 1.2rem 0.4rem;
  position: relative;
`;
