import { FC } from 'react';
import { InputGroup } from './InputGroup';
import { StyleInput, InputContainer } from './style';

const InputGroupWidget: FC<InputGroup.IProps> = ({
  placeholder,
  width,
  label,
}) => {
  return (
    <InputContainer>
      <label>{label}</label>
      <StyleInput width={width}>
        <input placeholder={placeholder} />
      </StyleInput>
    </InputContainer>
  );
};

export default InputGroupWidget;
