import { UtilsHelper } from '@utils/UtilsHelper';
import { Validation } from '@utils/ValidationHelper';
import React, { useState } from 'react';

const useFrom = (initialFValues, validateOnChange = false, validate) => {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState<{ [key: string]: any }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (Validation.isDigit(UtilsHelper.fixFarsiForSearch(value))) {
      setValues({
        ...values,
        [name]: UtilsHelper.fixFarsiForSearch(value),
      });
    } else {
      setValues({
        ...values,
        [name]: UtilsHelper.fixFarsiForSearch(value.toString()),
      });
    }

    if (validateOnChange) {
      if (Validation.isDigit(UtilsHelper.fixFarsiForSearch(value))) {
        validate({ [name]: UtilsHelper.fixFarsiForSearch(value) });
      } else {
        validate({ [name]: UtilsHelper.fixFarsiForSearch(value.toString()) });
      }
    }
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
};

export default useFrom;
