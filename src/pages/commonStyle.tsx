import styled from 'styled-components';

export const StyleLogo = styled.img`
  width: 110px;
  cursor: pointer;
  margin: 0 auto;
`;

export const Icon = styled.div<{ icon?: any }>`
  background-image: url(${(p) => p.icon});
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;
`;
