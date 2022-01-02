import { MediaQueryStyle } from '@utils/MediaQuery';
import styled, { css } from 'styled-components';

export const UnderConstructionContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
  ${MediaQueryStyle.xl(css<{ stype?: string }>`
    width: 80%;
  `)}
  ${MediaQueryStyle.sm(css<{ type?: string }>`
    flex-direction: column-reverse;
  `)}
`;
export const TextContainer = styled.div`
  flex: 45%;
  width: 100%;
  text-align: center;
  flex-direction: column;
  margin: 10px 0;
  ${MediaQueryStyle.sm(css<{ type?: string }>`
    margin: 0 0 10px 0;
  `)}
  > h2 {
    margin: 15px 0;
    line-height: 35px;
    ${MediaQueryStyle.sm(css<{ type?: string }>`
      font-size: 1.2em;
      margin: 0 0 5px 0;
    `)}
    ${MediaQueryStyle.xs(css<{ type?: string }>`
      font-size: 1.1em;
      margin: 0 0 5px 0;
    `)}
  }
`;
