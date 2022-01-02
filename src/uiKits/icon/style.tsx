import styled from 'styled-components';

export const StyleCustomIcon = styled.img<{ Height?: string; Width?: string }>`
  width: ${(props) => (props.Width ? props.Width : '24px')};
  height: ${(props) => (props.Height ? props.Height : '24px')};
`;
