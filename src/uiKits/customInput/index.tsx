import { Input } from '@material-ui/core';
import InputWidget from '@uikits/input/InputWidget';
import { UtilsHelper } from '@utils/UtilsHelper';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { ICustomInputProp } from './ICustomInputProp';

export const CustomInput: FunctionComponent<ICustomInputProp> = (props) => {
  const [value, setValue] = useState<string>(props.value);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.type == 'money') setValue(moneyFormat(e.target.value));
    if (props.type == 'money') e.target.value = e.target.value.replace(',', '');
    if (props.onChange) props.onChange(e);
  };

  const handleOnPaste = (e: any) => {
    if (props.type == 'money') setValue(moneyFormat(e.target.value));
  };

  const moneyFormat = (number) => {
    var pointReg = /([\d,\.]*)\.(\d*)$/,
      f;
    if (pointReg.test(number)) {
      f = RegExp.$2;
      return intFormat(RegExp.$1) + '.' + f;
    }
    return intFormat(number);
  };

  const intFormat = (number) => {
    var regex = /(\d)((\d{3},?)+)$/;
    number = number.split(',').join('');

    while (regex.test(number)) {
      number = number.replace(regex, '$1,$2');
    }
    return number;
  };

  const handleKeyPress = (e: any) => {
    let key = e.which ? e.which : e.keyCode;
    switch (props.type) {
      case 'money':
      case 'number':
        if (key == 8) return;
        if (key >= 48 && key <= 57) return;
        break;
    }
    e.preventDefault();
  };

  return (
    <>
      <InputWidget
        error={props.error}
        helperText={props.helperText}
        inputProps={{
          onChange: handleOnChange,
          onKeyPress: handleKeyPress,
          onPaste: handleOnPaste,
          maxLength: props.maxLength,
          type: 'text',
          placeholder: props.placeholder,
          value: value,
          name: props.name,
          style: props.style,
        }}
      />
    </>
  );
};

export default CustomInput;
