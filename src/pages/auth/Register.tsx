import { ChangeEvent, useState, FC } from 'react';

import { FormContainer, StyleBtns } from './style';
import { colorPalette } from '@uikits/colors/Color';
import { Common } from '@pages/Common';
import { IAuth } from './Auth';
import FormItemWidget from '@uikits/form/FormItemsWidget';
import FormWidget from '@uikits/form/FormWidget';
import InputWidget from '@uikits/input/InputWidget';
import ButtonWidget from '@uikits/button/ButtonWidget';
import useHttpRequest from '@hooks/useHttpRequest';
import { SEND_CONFIRM_CODE } from '@config/constantApi';
import ReactLoading from 'react-loading';

const initState = {
  mobile: '',
};

const Register: FC<IAuth.IChangePage> = ({ onChagePage }) => {
  const [values, setValues] = useState(initState);
  const [error, setError] = useState<Common.IErrors>(initState);
  const { postRequest } = useHttpRequest();
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: Common.IErrors = {};

    if (values?.mobile.length !== 11 || !values?.mobile.startsWith('09')) {
      errors.mobile = 'شماره همراه میبایست 11 رقم و بصورت 09xxxxxxxxx  باشد';
    }

    if (!(Object.keys(errors).length > 0)) {
      setLoading(true);
      postRequest(SEND_CONFIRM_CODE, values)
        .then((resp) => {
          setLoading(false);
          onChagePage!(2, values);
        })
        .catch(() => {
          setLoading(false);
        });
    }

    setError(errors);
  };

  return (
    <FormWidget onSubmit={handleSubmit}>
      <FormContainer>
        <FormItemWidget lable={'شماره تلفن همراه'} required={true}>
          <InputWidget
            error={error.mobile}
            helperText={error.mobile}
            inputProps={{
              placeholder: 'شماره تلفن همراه خود را صورت 09xxxxxxxxx وارد کنید',
              name: 'mobile',
              value: values.mobile,
              onChange: handleInputChange,
            }}
          />
        </FormItemWidget>
      </FormContainer>

      <StyleBtns>
        <ButtonWidget width={'100%'} height={'48px'} type={'submit'}>
          {loading && (
            <ReactLoading
              type={'spinningBubbles'}
              color={'#ffffff'}
              height={25}
              width={25}
            />
          )}
          ارسال کد تایید
        </ButtonWidget>

        <ButtonWidget
          width={'97%'}
          height={'48px'}
          background={colorPalette.gray_900}
          type={'button'}
          onClick={() => onChagePage!(0)}
        >
          بازگشت
        </ButtonWidget>
      </StyleBtns>
    </FormWidget>
  );
};

export default Register;
