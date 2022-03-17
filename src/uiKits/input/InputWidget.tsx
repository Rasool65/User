import { useState, FC } from 'react';

import {
  StyleInput,
  StyleFormItemErrMsg,
  StyleContainer,
  StyleTextArea,
} from './style';

import { Input } from './Input';

const InputWidget: FC<Input.IProps> = ({
  error,
  helperText,
  inputProps,
  prefix,
  suffix,
  style,
  forwardeRef,
  type,
}) => {
  return (
    <StyleContainer style={style}>
      <span className={'input__prefix'}>{prefix}</span>

      {type === 'TextArea' ? (
        <StyleTextArea
          hasPrefex={prefix}
          hasSuffix={suffix}
          autoComplete={'off'}
          error={error}
          ref={forwardeRef}
          {...inputProps}
        />
      ) : (
        <StyleInput
          hasPrefex={prefix}
          hasSuffix={suffix}
          autoComplete={'off'}
          error={error}
          ref={forwardeRef}
          {...inputProps}
        />
      )}

      <span className={'input__suffix'}>{suffix}</span>

      <StyleFormItemErrMsg>{helperText}</StyleFormItemErrMsg>
    </StyleContainer>
  );
};

export default InputWidget;
