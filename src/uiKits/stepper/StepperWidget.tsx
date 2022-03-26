import {
  StyleConnector,
  StyleStepContainer,
  StyleStepIcon,
  StyleStepperContainer,
  StyleStepTitle,
} from './style';
import IconWidget from '@uikits/icon/IconWidget';
import React from 'react';

const activeIconStyle = {
  filter:
    'invert(11%) sepia(99%) saturate(5031%) hue-rotate(353deg) brightness(117%) contrast(84%)',
};

const Stepper = ({ steps, activeStep }) => {
  return (
    <StyleStepperContainer>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <StyleStepContainer isActive={index === activeStep}>
            <StyleStepIcon>
              <IconWidget
                src={step.icon}
                width='30px'
                height='30px'
                style={index === activeStep ? activeIconStyle : {}}
              />
            </StyleStepIcon>
            <StyleStepTitle>{step.name}</StyleStepTitle>
          </StyleStepContainer>
          {index + 1 < steps.length && <StyleConnector />}
        </React.Fragment>
      ))}
    </StyleStepperContainer>
  );
};
export default Stepper;
