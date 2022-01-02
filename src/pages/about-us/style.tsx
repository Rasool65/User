import styled, { css } from 'styled-components';
import { colorPalette } from '@uikits/colors/Color';
import { CustomSize, MediaQueryStyle } from '@utils/MediaQuery';

export const SectionAboutUs = styled.section`
  width: 100%;
`;

export const AboutUsHeader = styled.div`
  width: 100%;
  > div {
    border-radius: 0;
    height: 300px;
    ::before {
      border-radius: 0;
    }
    > div > button {
      font-size: 18px;
      border-radius: 22px;
      ${MediaQueryStyle.sm(css`
        font-size: 16px;
        width: 90%;
      `)}
    }
  }
`;

export const AboutUsContent = styled.div`
  margin: 35px auto 10px auto;
  width: 100%;
`;

export const ContentText = styled.div`
  width: 100%;
  margin: 20px auto 30px auto;
  > p {
    font-size: 14px;
    line-height: 22px;
    color: ${colorPalette.black_450};
    text-align: justify;
  }
`;

export const StyleImageArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px auto 50px auto;
`;
export const StyleAreaLeft = styled.div<{ src?: string }>`
  width: 49%;
  height: 379px;
  background-image: url(${(props) => (props.src ? props.src : '')});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;
export const StyleAreaRight = styled.div`
  width: 49%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const StyleAreaRightTop = styled.div<{ src?: string }>`
  width: 100%;
  height: 179px;
  background-image: url(${(props) => (props.src ? props.src : '')});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;
export const StyleAreaRightButton = styled.div<{ src?: string }>`
  width: 100%;
  height: 179px;
  background-image: url(${(props) => (props.src ? props.src : '')});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;
export const StyleBrands = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 30px;
  flex-wrap: wrap;
  column-gap: 92px;
  margin-top: 35px;
  ${MediaQueryStyle.sm(css`
    gap: 35px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `)}
`;
export const StyleBrandItem = styled.div<{ src?: string }>`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: space-between;
  background-image: url(${(props) => (props.src ? props.src : '')});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;
