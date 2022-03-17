import Card from '@uikits/card/CardWidget';
import { useState, FC, ChangeEvent } from 'react';
import { FormRowPass, BtnsRow } from '../style';
import { StyleCustomBtn } from '@uikits/button/style';
import FormItemWidget from '@uikits/form/FormItemsWidget';
import FormWidget from '@uikits/form/FormWidget';
import InputWidget from '@uikits/input/InputWidget';
import { colorPalette } from '@uikits/colors/Color';
import { IUser } from '../User';
import { CHANGE_PASSWORD_API } from '@config/constantApi';
import useHttpRequest from '@hooks/useHttpRequest';
import { Common } from '@pages/Common';
import ReactLoading from 'react-loading';
import useFrom from '@hooks/useFrom';
import { CustomSize } from '@utils/MediaQuery';

const initState = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword: FC<IUser.IChangePage> = ({
  onChagePage,
  handleSnackbar,
}) => {
  const [changePage, setchangePage] = useState(false);
  const { postRequest } = useHttpRequest();

  const [loading, setLoading] = useState(false);
  const { innerWidth: width } = window;

  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ('password' in fieldValues)
      temp.password =
        fieldValues.password.length !== 0
          ? ''
          : 'وارد کردن این فیلد الزامی است';
    if ('newPassword' in fieldValues)
      temp.newPassword =
        fieldValues.newPassword.length !== 0
          ? ''
          : 'وارد کردن این فیلد الزامی است';
    if ('newPassword' in fieldValues)
      temp.newPassword =
        fieldValues.newPassword.length < 6
          ? 'طول پسورد نباید کمتر از 6 کاراکتر باشد'
          : '';
    if ('confirmPassword' in fieldValues)
      temp.confirmPassword =
        fieldValues.confirmPassword.length !== 0
          ? ''
          : 'وارد کردن این فیلد الزامی است';
    if ('confirmPassword' in fieldValues)
      temp.confirmPassword =
        fieldValues.confirmPassword.length < 6
          ? 'طول پسورد نباید کمتر از 6 کاراکتر باشد'
          : '';
    if ('confirmPassword' in fieldValues)
      temp.confirmPassword =
        fieldValues.confirmPassword !== values.newPassword
          ? 'رمز عبور با تکرار رمز عبور مطابقت ندارد'
          : '';

    setErrors({
      ...temp,
    });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === '');
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useFrom(initState, true, validate);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate()) {
      setLoading(true);
      postRequest(CHANGE_PASSWORD_API, values)
        .then((resp) => {
          onChagePage!(0);
          handleSnackbar!(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Card>
      <FormWidget onSubmit={handleSubmit}>
        <FormRowPass>
          <FormItemWidget lable={'رمز عبور فعلی'} required={true}>
            <InputWidget
              error={errors.password}
              helperText={errors.password}
              inputProps={{
                type: 'password',
                placeholder: 'رمز عبور خود را وارد کنید',
                value: values.password,
                onChange: handleInputChange,
                name: 'password',
                style: {
                  width: innerWidth > CustomSize.mobile ? '50%' : '100%',
                },
              }}
            />
          </FormItemWidget>
          <FormItemWidget lable={'رمز عبور جدید'} required={true}>
            <InputWidget
              error={errors.newPassword}
              helperText={errors.newPassword}
              inputProps={{
                type: 'password',
                placeholder: 'رمز عبور جدید خود را وارد کنید',
                value: values.newPassword,
                onChange: handleInputChange,
                name: 'newPassword',
                style: {
                  width: innerWidth > CustomSize.mobile ? '50%' : '100%',
                },
              }}
            />
          </FormItemWidget>
          <FormItemWidget lable={'تکرار رمز عبور '} required={true}>
            <InputWidget
              error={errors.confirmPassword}
              helperText={errors.confirmPassword}
              inputProps={{
                type: 'password',
                placeholder: 'تکرار رمز عبور جدید خود را وارد کنید',
                value: values.confirmPassword,
                onChange: handleInputChange,
                name: 'confirmPassword',
                style: {
                  width: innerWidth > CustomSize.mobile ? '50%' : '100%',
                },
              }}
            />
          </FormItemWidget>
          <BtnsRow>
            <StyleCustomBtn type='submit' Width={'168px'} Height={'45px'}>
              {loading && (
                <ReactLoading
                  type={'spinningBubbles'}
                  color={'#ffffff'}
                  height={25}
                  width={25}
                />
              )}
              تغییر رمز عبور
            </StyleCustomBtn>
            <StyleCustomBtn
              onClick={() => onChagePage!(0)}
              style={{
                color: colorPalette.red_650,
                border: '2px solid ' + colorPalette.red_650,
                fontWeight: 'bold',
              }}
              type='button'
              Background={colorPalette.white}
              Width={'121px'}
              Height={'45px'}
            >
              بازگشت
            </StyleCustomBtn>
          </BtnsRow>
        </FormRowPass>
      </FormWidget>
    </Card>
  );
};

export default ChangePassword;
