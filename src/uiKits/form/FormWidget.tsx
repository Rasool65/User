import { FC } from 'react';

import { Form } from './Form';

const FormWidget: FC<Form.IFormProps> = ({ children, onSubmit, ...other }) => {
  return (
    <form
      autoComplete='new-password'
      noValidate={true}
      onSubmit={onSubmit}
      {...other}
    >
      {children}
    </form>
  );
};

export default FormWidget;
