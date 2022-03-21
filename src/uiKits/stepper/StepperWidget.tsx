import {
  StyleConnector,
  StyleStepContainer,
  StyleStepIcon,
  StyleStepperContainer,
  StyleStepTitle,
} from './style';
import React from 'react';

const Stepper = ({ steps, activeStep }) => {
  return (
    <StyleStepperContainer>
      {steps.map((step, index) => (
        <>
          <StyleStepContainer isActive={index === activeStep}>
            <StyleStepIcon>Icon</StyleStepIcon>
            <StyleStepTitle>{step.name}</StyleStepTitle>
          </StyleStepContainer>
          {index + 1 < steps.length && <StyleConnector />}
        </>
      ))}
    </StyleStepperContainer>
  );
};
export default Stepper;
