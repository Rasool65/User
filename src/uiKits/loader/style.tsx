import styled, { css, keyframes } from 'styled-components';

export const LoadingContainer = styled.div<{ loaderColored?: string }>`
  display: flex;
  height: 100%;
  width: 100%;
  border: 0;
  background-color: transparent;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  z-index: 3;
  position: absolute;
  > div {
    display: flex;
    background-color: ${(props) =>
      props.loaderColored ? props.loaderColored : 'white'};
  }
`;

/* Animation KeyFrame*/
export const LoadingKeyFrame = keyframes`
    0%,100%{
    transform: translateY(0) scale(1);
    }
    30%{
    transform: translateY(0) scale(.98);
    }
    35%{
    transform: translateY(-2px) scale(.95);
    }
    40%{
    transform: translateY(-6px) scale(.9);
    }
    45%{
      transform: translateY(-8px) scale(.85);
    }
    50%{
    transform:scale(.85) translateY(-6px);
    }
    55% {
    transform: scale(.9) translateY(-4px);
    }
    65%{
    transform: translateY(-2px) scale(.95);
    }
    75%{
    transform: translateY(-1px) scale(1);
    }
    85%{
    transform: translateY(0) scale(1.05);
    }
    90% {
    transform: scale(1.05) translateY(0);
    }
    95%{
    transform: scale(1.05)
    }
    98%{
    transform: scale(1) translateY(0)
    }
`;
/* loading items*/
export const LoadingAnim = styled.div`
  height: 6px;
  width: 6px;
  border-radius: 50%;
  border: 0;
  display: inline-block;
  animation: ${LoadingKeyFrame} 0.9s infinite ease-in-out both;
`;
export const LoadingItemA = styled(LoadingAnim)`
  animation-delay: -0.2s;
  margin: 0px 2px;
`;
export const LoadingItemB = styled(LoadingAnim)`
  animation-delay: -0.1s;
  margin: 0px 2px;
`;
export const LoadingItemC = styled(LoadingAnim)`
  margin: 0px 2px;
`;
