import { ChangeEvent, useState, FC, useEffect } from 'react';

import {
  FormContainer,
  StyleNotice,
  StyleTextLink,
  StyleTextForget,
  StyleBtns,
  StyleSupport,
} from './style';
import { colorPalette } from '@uikits/colors/Color';
import { Common } from '@pages/Common';
import { IAuth } from './Auth';
import { saveAs } from 'file-saver';
import FormItemWidget from '@uikits/form/FormItemsWidget';
import FormWidget from '@uikits/form/FormWidget';
import InputWidget from '@uikits/input/InputWidget';
import EyePasswordSvg from '@assets/img/EyePassword';
import VisibilitySvg from '@assets/img/visibility.svg';
import ButtonWidget from '@uikits/button/ButtonWidget';
import { LOGIN_POST, _UUID, _TOKEN_NAME, CART } from '@config/constantApi';
import { LANDING_URL } from '@config/constantUrl';
import useHttpRequest from '@hooks/useHttpRequest';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginPageAction } from '@redux/layout/actions';
import * as uuid from 'uuid';
import ReactLoading from 'react-loading';
import IconWidget from '@uikits/icon/IconWidget';
import useFrom from '@hooks/useFrom';
import { BASE_URL } from './../../config/urls';
const initState = {
  mobile: '',
  passwords: '',
};

const Login: FC<IAuth.IChangePage> = ({ onChagePage }) => {
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ('mobile' in fieldValues)
      temp.mobile =
        fieldValues.mobile.length !== 0 ? '' : 'وارد کردن این فیلد الزامی است';
    if ('passwords' in fieldValues)
      temp.passwords =
        fieldValues.passwords.length !== 0
          ? ''
          : 'وارد کردن این فیلد الزامی است';

    setErrors({
      ...temp,
    });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === '');
    }
  };

  const downloadRegisterFile = () => {
    saveAs(BASE_URL + '/Files/Doc/Register.pdf', 'Register.pdf');
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const { postRequest, getRequest } = useHttpRequest();
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useFrom(initState, true, validate);

  const [loading, setLoading] = useState(false);

  const [showPass, setShowPass] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem(_TOKEN_NAME) && localStorage.getItem(_UUID)) {
      history.push(LANDING_URL);
    }
    // localStorage.removeItem(_TOKEN_NAME);
    // localStorage.removeItem(_UUID);
    // dispatch(loginPageAction(true));
  }, [localStorage.getItem(_TOKEN_NAME), localStorage.getItem(_UUID)]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate()) {
      setLoading(true);
      postRequest(LOGIN_POST, values)
        .then((resp) => {
          localStorage.setItem(_TOKEN_NAME, resp.data.token);
          localStorage.setItem(_UUID, uuid.v4());

          history.push(LANDING_URL);

          dispatch(loginPageAction(false));
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <FormWidget onSubmit={handleSubmit}>
      <FormContainer>
        <FormItemWidget lable={'شماره موبایل یا ایمیل'} required={true}>
          <InputWidget
            error={errors?.mobile}
            helperText={errors?.mobile}
            inputProps={{
              placeholder: 'شماره موبایل یا پست الکترونیکی خود را وارد کنید',
              name: 'mobile',
              value: values.mobile,
              onChange: handleInputChange,
            }}
          />
        </FormItemWidget>

        <FormItemWidget lable={'رمز عبور'} required={true}>
          <InputWidget
            suffix={
              showPass ? (
                <EyePasswordSvg onClick={() => setShowPass(!showPass)} />
              ) : (
                <div onClick={() => setShowPass(!showPass)}>
                  <IconWidget
                    alt='Visibility'
                    src={VisibilitySvg}
                    width={'19px'}
                    height={'17px'}
                  />
                </div>
              )
            }
            error={errors?.passwords}
            helperText={errors?.passwords}
            inputProps={{
              placeholder: 'رمز عبور خود را وارد کنید',
              type: showPass ? 'text' : 'password',
              name: 'passwords',
              value: values.passwords,
              onChange: handleInputChange,
            }}
          />
        </FormItemWidget>
      </FormContainer>

      <StyleNotice>
        <StyleTextForget onClick={() => onChagePage!(3)}>
          رمز عبور خود را فراموش کرده اید؟
        </StyleTextForget>
        <StyleTextLink onClick={() => onChagePage!(1)}>
          ورود با رمز یک بار مصرف
        </StyleTextLink>
      </StyleNotice>

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
          ورود
        </ButtonWidget>

        <ButtonWidget
          width={'100%'}
          height={'48px'}
          background={colorPalette.gray_900}
          type={'button'}
          onClick={downloadRegisterFile}
        >
          دانلود فرم عضویت
        </ButtonWidget>
      </StyleBtns>
      <StyleSupport>
        <p>شماره پشتیبانی : 61370000-021</p>
      </StyleSupport>
    </FormWidget>
  );
};

export default Login;
