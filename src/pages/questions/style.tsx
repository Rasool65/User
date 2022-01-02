import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { CustomSize, MediaQueryStyle } from '@utils/MediaQuery';

export const SectionQuestions = styled.section`
  width: 100%;
`;

export const QuestionsHeader = styled.div`
  width: 100%;
  > div {
    border-radius: 0;
    height: 376px;
    background: linear-gradient(
      0deg,
      rgb(243 175 175) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    margin-bottom: 0;
    ::before {
      border-radius: 0;
    }
  }
`;

export const HeaderTitle = styled.h4`
  font-size: 28px;
  color: ${colorPalette.black_440};
  margin-bottom: 50px;
  ${MediaQueryStyle.sm(css`
    font-size: 20px;
    line-height: 1.5;
  `)}
`;

export const HeaderInputGroup = styled.div`
  padding: 12px 8px;
  width: 50%;
  border-radius: 9px;
  background: ${colorPalette.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  > img {
    margin-right: 9px;
  }
  ${MediaQueryStyle.sm(css`
    width: 90%;
    > button {
      width: 75px !important;
    }
  `)}
`;

export const InputCustom = styled.input`
  font-size: 14px;
  color: ${colorPalette.gray_300};
  border: none;
  flex-grow: 1;
  padding-right: 15px;
  :focus-visible {
    outline: unset;
  }
`;

export const QuestionContent = styled.div`
  margin: 0 auto 30px auto;
  padding: 0 20px;
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: ${colorPalette.black_450};
`;

export const ContentTitle = styled.h1`
  text-align: center;
  font-size: 28px;
  color: ${colorPalette.gray_250};
  margin: 70px auto 20px auto;
  ${MediaQueryStyle.sm(css`
    font-size: 20px;
    line-height: 1.5;
  `)}
`;
export const ContentDescription = styled.p`
  text-align: center;
  font-size: 14px;
  line-height: 22px;
  width: 70%;
  margin: 0 auto;
  color: ${colorPalette.gray_95};
  margin-bottom: 80px;
  ${MediaQueryStyle.sm(css`
    width: 100%;
  `)}
`;
export const ContactUs = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  margin-top: 30px;
  ${MediaQueryStyle.sm(css`
          flex-direction: column;
          }
    `)}
`;
export const ContactUsItem = styled.div<{ name?: string }>`
  width: 49%;
  height: 199px;
  display: flex;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${(props) =>
    props.name === 'phone' ? colorPalette.white : colorPalette.pink_10};
  border: ${(props) =>
    props.name === 'phone'
      ? '1px solid ' + colorPalette.gray_20
      : '1px solid ' + colorPalette.pink_10};
  > h6 {
    font-size: 14px;
    color: ${colorPalette.gray_250};
    margin: 12px auto;
  }
  > p {
    font-size: 13px;
    color: ${colorPalette.gray_110};
  }
  ${MediaQueryStyle.sm(css`
    width: 70%;
    > p {
      text-align: center;
    }
  `)}
`;
