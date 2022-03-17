import { ChangeEvent, useState, FC, useRef, useEffect } from 'react';

import { FormContainer, StyleBtns, StyleValidateCode } from './style';
import { StyleDivider } from '@uikits/divider/style';
import { colorPalette } from '@uikits/colors/Color';
import { Common } from '@pages/Common';
import { IAuth } from './Auth';
import FormItemWidget from '@uikits/form/FormItemsWidget';
import FormWidget from '@uikits/form/FormWidget';
import InputWidget from '@uikits/input/InputWidget';
import ButtonWidget from '@uikits/button/ButtonWidget';
import useHttpRequest from '@hooks/useHttpRequest';
import { CONFIRM_CODE, _UUID, _TOKEN_NAME } from '@config/constantApi';
import ReactLoading from 'react-loading';
import { LANDING_URL } from '@config/constantUrl';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as uuid from 'uuid';
import { loginPageAction } from '@redux/layout/actions';

const initState = {
  code1: '',
  code2: '',
  code3: '',
  code4: '',
  code5: '',
};

const MobileCode: FC<IAuth.IChangePage> = ({ onChagePage, pageData }) => {
  const history = useHistory();
  const { postRequest } = useHttpRequest();
  const dispatch = useDispatch();
  const inputRef = useRef<any>();
  const [values, setValues] = useState(initState);
  const [error, setError] = useState<Common.IErrors>(initState);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem(_TOKEN_NAME);
    localStorage.removeItem(_UUID);
    dispatch(loginPageAction(true));
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    if (event.target.value.length === 1) {
      const nextIndex = +event.target.name.slice(4, 5);
      if (nextIndex < 6) {
        const nextSibling = document.querySelector<any>(
          `input[name=code${nextIndex + 1}]`
        );
        nextSibling.focus();
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: Common.IErrors = {};

    for (const key in values) {
      if (values[key].length === 0 || values[key].length > 1) {
        errors[key] = 'نامعتبر';
      }
    }

    if (!(Object.keys(errors).length > 0)) {
      let Code = '';
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          Code += values[key];
        }
      }
      const validateCode = +Code;

      const body = {
        mobile: pageData.mobile,
        code: String(validateCode),
      };
      console.log(body);
      // 09129333491
      setLoading(true);
      postRequest(CONFIRM_CODE, body)
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

    setError(errors);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <FormWidget onSubmit={handleSubmit}>
      <FormContainer>
        <FormItemWidget lable={'کد تایید'} required={true}>
          <StyleValidateCode>
            {/* <InputWidget
                            style={{ width: '45px', height: '45px' }}
                            error={error.code6}
                            helperText={error.code6}
                            inputProps={{
                                name: 'code6',
                                value: values.code6,
                                style: { textAlign: 'center' },
                                required: true,
                                minLength: 1,
                                maxLength: 1,
                                onChange: handleInputChange
                            }}
                        /> */}

            <InputWidget
              style={{ width: '45px', height: '45px' }}
              error={error.code5}
              helperText={error.code5}
              inputProps={{
                name: 'code5',
                value: values.code5,
                style: { textAlign: 'center' },
                required: true,
                minLength: 1,
                maxLength: 1,
                onChange: handleInputChange,
              }}
            />

            <InputWidget
              style={{ width: '45px', height: '45px' }}
              error={error.code4}
              helperText={error.code4}
              inputProps={{
                name: 'code4',
                value: values.code4,
                style: { textAlign: 'center' },
                required: true,
                minLength: 1,
                maxLength: 1,
                onChange: handleInputChange,
              }}
            />
            {/* <StyleDivider Width={'20px'} Height={'2px'} Type={'Horizontal'} Background={colorPalette.gray_35} /> */}
            <InputWidget
              style={{ width: '45px', height: '45px' }}
              error={error.code3}
              helperText={error.code3}
              inputProps={{
                name: 'code3',
                value: values.code3,
                style: { textAlign: 'center' },
                required: true,
                minLength: 1,
                maxLength: 1,
                onChange: handleInputChange,
              }}
            />
            <InputWidget
              style={{ width: '45px', height: '45px' }}
              error={error.code2}
              helperText={error.code2}
              inputProps={{
                name: 'code2',
                value: values.code2,
                style: { textAlign: 'center' },
                required: true,
                minLength: 1,
                maxLength: 1,
                onChange: handleInputChange,
              }}
            />

            <InputWidget
              style={{ width: '45px', height: '45px' }}
              error={error.code1}
              helperText={error.code1}
              forwardeRef={inputRef}
              inputProps={{
                name: 'code1',
                value: values.code1,
                style: { textAlign: 'center' },
                required: true,
                minLength: 1,
                maxLength: 1,
                onChange: handleInputChange,
              }}
            />
          </StyleValidateCode>
        </FormItemWidget>
      </FormContainer>

      <StyleBtns>
        <ButtonWidget width={'100%'} height={'48px'}>
          {loading && (
            <ReactLoading
              type={'spinningBubbles'}
              color={'#ffffff'}
              height={25}
              width={25}
            />
          )}
          بررسی کد تایید
        </ButtonWidget>

        <ButtonWidget
          width={'97%'}
          height={'48px'}
          background={colorPalette.gray_10}
          color={colorPalette.gray_65}
          onClick={() => onChagePage!(1)}
        >
          ارسال مجدد
        </ButtonWidget>
      </StyleBtns>
    </FormWidget>
  );
};

export default MobileCode;
