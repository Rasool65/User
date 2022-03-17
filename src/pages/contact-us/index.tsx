import { CONTACT_US_URL, QUESTIONS_URL } from '@config/constantUrl';
import { USER_PANEL_MESSAGE_API } from '@config/constantApi';
import useFrom from '@hooks/useFrom';
import { useState, useEffect } from 'react';
import useHttpRequest from '@hooks/useHttpRequest';
import ButtonWidget from '@uikits/button/ButtonWidget';
import DividerWidget from '@uikits/divider/DividerWidget';
import FormItemWidget from '@uikits/form/FormItemsWidget';
import FormWidget from '@uikits/form/FormWidget';
import InputWidget from '@uikits/input/InputWidget';
import Section from '@uikits/section/SectionWidget';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Container } from 'src/style';
import ReactLoading from 'react-loading';
import MapWidget from '@uikits/map/MapWidget';
import { validateEmail, validatePhoneNumber } from '@utils/ValidationHelper';
import { useSnackbar } from 'notistack';
import SelectWidget from '@uikits/select';
import { CUSTOMER_PROFILE } from '@config/constantApi';
import { useSelector } from 'react-redux';

import {
  BtnContainer,
  ContactUsRow,
  FormContainer,
  FormItemContainer,
  InfoContainer,
  InfoItem,
  MapContainer,
  MapInfoContainer,
} from './style';
const initState = {
  name: '',
  email: '',
  phoneNumber: '',
  content: '',
  title: 'انتخاب موضوع',
};

function Content({ h, p }) {
  return p ? (
    <>
      <h3>{h}</h3>
      <p>{p}</p>
    </>
  ) : null;
}

const optionList = [
  {
    value: 'انتخاب موضوع',
    txt: '-- انتخاب موضوع --',
  },
  {
    value: 'پیشنهاد',
    txt: 'پیشنهاد',
  },
  {
    value: 'انتقاد',
    txt: 'انتقاد',
  },
  {
    value: 'پشتیبانی',
    txt: 'پشتیبانی',
  },
  {
    value: 'سایر',
    txt: 'سایر',
  },
];

function ContactUs() {
  const { setting } = useSelector((state: any) => state.settingReducer);

  const validate = (fieldValues = values) => {
    const temp = { ...errors };

    // if ('email' in fieldValues) temp.email = validateEmail(fieldValues.email);
    if ('phoneNumber' in fieldValues)
      temp.phoneNumber = validatePhoneNumber(fieldValues.phoneNumber);
    if ('content' in fieldValues)
      temp.content =
        fieldValues.content.length !== 0 ? '' : 'وارد کردن این فیلد الزامی است';
    if ('title' in fieldValues)
      temp.title =
        fieldValues.title === 'انتخاب موضوع' ? 'لطفا موضوع را وارد کنید' : '';
    setErrors({
      ...temp,
    });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === '');
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useFrom(
    initState,
    true,
    validate
  );

  const { getRequest, postRequest } = useHttpRequest();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const handleClickChangePage = () => {
    history.push('/questions');
  };
  const handleClickSubmitForm = (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      //  postRequest(CONTACT_US_URL, values).then((resp) => {
      postRequest(USER_PANEL_MESSAGE_API, values).then((resp) => {
        enqueueSnackbar('با موفقیت ثبت شد', {
          variant: 'info',
        });
        setLoading(false);
        setValues({
          ...values,
          content: '',
          title: 'انتخاب موضوع',
        });
      });
    }
  };

  useEffect(() => {
    getRequest(CUSTOMER_PROFILE)
      .then((resp) => {
        const { fullName, mobile } = resp.data;
        setValues({ ...initState, name: fullName, phoneNumber: mobile });
      })
      .catch(() => {
        return;
      });
  }, []);
  return (
    <Container isHidden={false}>
      <Section name='تماس با ما' width='inherit'>
        <ContactUsRow>
          <p>
            لطفا پیش از ارسال ایمیل یا تماس تلفنی ابتدا{' '}
            <Link style={{ color: 'red' }} to={QUESTIONS_URL}>
              پرسش های متداول
            </Link>{' '}
            را مشاهده نمایید.
          </p>
          <ButtonWidget onClick={handleClickChangePage}>
            پرسش های متداول
          </ButtonWidget>
        </ContactUsRow>
        <DividerWidget type='Horizontal' />
        <FormContainer>
          <p>
            برای پیگیری یا سوال درباره سفارش و ارسال پیام بهتر است از فرم زیر
            استفاده کنید.
          </p>
          <FormWidget onSubmit={handleClickSubmitForm}>
            <FormContainer>
              <FormItemContainer>
                <FormItemWidget lable={'موضوع'} required={true}>
                  <SelectWidget
                    onChange={handleInputChange}
                    name={'title'}
                    value={values.title}
                    optionList={optionList}
                    error={errors?.title}
                    helperText={errors?.title}
                  />
                </FormItemWidget>
              </FormItemContainer>
              <FormItemContainer>
                {/* <FormItemWidget lable={'ایمیل'}>
                  <InputWidget
                    error={errors?.email}
                    helperText={errors?.email}
                    inputProps={{
                      placeholder: 'example@domain.com',
                      name: 'email',
                      onChange: handleInputChange,
                      value: values.email,
                    }}
                  />
                </FormItemWidget> */}
                <FormItemWidget lable={'نام و نام خانوادگی'} required={true}>
                  <InputWidget
                    error={errors?.name}
                    helperText={errors?.name}
                    inputProps={{
                      name: 'name',
                      placeholder: 'نام و نام خانوادگی خود را وارد کنید',
                      value: values.name,
                      readOnly: true,
                    }}
                  />
                </FormItemWidget>
                <FormItemWidget lable={'موبایل'} required={true}>
                  <InputWidget
                    error={errors?.phoneNumber}
                    helperText={errors?.phoneNumber}
                    inputProps={{
                      placeholder: '*********09 یا*******021',
                      name: 'phoneNumber',
                      onChange: (e) =>
                        e.currentTarget.value.length <= 11 &&
                        handleInputChange(e),
                      value: values.phoneNumber,
                      readOnly: true,
                    }}
                  />
                </FormItemWidget>
              </FormItemContainer>
              <FormItemContainer>
                <FormItemWidget lable={'متن پیام'} required={true}>
                  <InputWidget
                    type='TextArea'
                    error={errors?.content}
                    helperText={errors?.content}
                    style={{ height: '7rem' }}
                    inputProps={{
                      placeholder: 'متن پیام را وارد کنید',
                      name: 'content',
                      onChange: handleInputChange,
                      value: values.content,
                    }}
                  />
                </FormItemWidget>
              </FormItemContainer>
              <BtnContainer>
                <ButtonWidget type='submit' width='10rem' height='2.7rem'>
                  {loading ? (
                    <ReactLoading
                      type={'spinningBubbles'}
                      color={'#ffffff'}
                      height={25}
                      width={25}
                    />
                  ) : (
                    <h4>ثبت و ارسال</h4>
                  )}
                </ButtonWidget>
              </BtnContainer>
            </FormContainer>
          </FormWidget>
        </FormContainer>
      </Section>
      <DividerWidget />
      <Section name={setting?.title} width='inherit'>
        <MapInfoContainer>
          <InfoContainer>
            <InfoItem>
              <Content p={setting?.address} h='آدرس' />
            </InfoItem>
            <InfoItem>
              <Content p={setting?.phoneNumber} h='شماره های تماس' />
            </InfoItem>
            <InfoItem>
              <Content p={setting?.postalCode} h='کد پستی' />
            </InfoItem>
            <InfoItem>
              <Content p={setting?.email} h='ایمیل سازمانی' />
            </InfoItem>
          </InfoContainer>
          <MapContainer>
            <MapWidget lat={setting?.latitude} lon={setting?.longitude} />
          </MapContainer>
        </MapInfoContainer>
      </Section>
    </Container>
  );
}

export default ContactUs;
