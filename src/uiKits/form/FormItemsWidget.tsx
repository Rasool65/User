import { FC } from 'react';

import { StyleFormItemContainer, StyleFormItemLable } from './style';

import { Form } from './Form';

const FormItemWidget: FC<Form.IItemProps> = ({
  children,
  lable,
  style,
  labelStyle,
  required,
  className,
}) => {
  return (
    <StyleFormItemContainer
      style={style}
      className={`lable__container ${className}`}
    >
      <StyleFormItemLable required={required}>
        <span className={'lable'} style={labelStyle}>
          {lable}
        </span>
        <span className={'lable__required'}>*</span>
        {/* <span className={'lable__tip'} onClick={onLableTip}>
                    {
                        lableTip
                    }
                </span> */}
      </StyleFormItemLable>

      {children}
    </StyleFormItemContainer>
  );
};

export default FormItemWidget;
