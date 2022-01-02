import { CustomSize, MediaQueryStyle } from '@utils/MediaQuery';
import styled, { css } from 'styled-components';

export const Container = styled.div<{ isHidden }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: ${(props) => (props.isHidden ? '0' : '0 auto')};
  ${(props) =>
    props.isHidden
      ? ''
      : MediaQueryStyle.xl(
          css`
            width: 82%;
          `
        )}
  ${(props) =>
    props.isHidden
      ? ''
      : MediaQueryStyle.lg(
          css`
            width: 82%;
          `
        )}
  .MuiAlert-message {
    margin: 0 25px;
  }
  ${MediaQueryStyle.sm(css<{ isHidden }>`
    width: ${(props) => (props.isHidden ? '100%' : '87%')};
    p {
      line-height: 1.5;
    }
  `)}
`;

export const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
`;
