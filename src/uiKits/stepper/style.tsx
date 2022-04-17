import { colorPalette } from '@uikits/colors/Color';
import styled from 'styled-components';

export const StyleStepperContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  border: 1px solid #eaeaea;
  border-radius: 1.5rem;
  margin: 3rem 3rem 1rem 3rem;
  border-radius: 15px;
  padding: 1.25rem 1.75rem;
`;
export const StyleStepContainer = styled.div<{
  isActive?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  color: ${(props) =>
    props.isActive ? colorPalette.red_100 : colorPalette.gray_100};
  opacity: ${(props) => (props.isActive ? '100%' : '70%')};
`;

export const StyleConnector = styled.div<{
  isActive?: boolean;
}>`
  flex: 1;
  height: 1px;
  background-color: ${(props) =>
    props.isActive ? colorPalette.gray_100 : colorPalette.gray_60};
  display: flex;
  align-self: center;
  margin-bottom: 10px;
`;
export const StyleStepIcon = styled.div<{
  isActive?: boolean;
}>``;

export const StyleStepTitle = styled.h5`
  margin-top: 0.3rem;
`;
