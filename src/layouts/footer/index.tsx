import { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import validator from 'validator';
import {
  LANDING_URL,
  PRODUCTS_URL,
  QUESTIONS_URL,
  ABOUT_US_URL,
  TERMS_URL,
  PRIVACIES_URL,
  CUSTOMER_CLUB_URL,
} from '@config/constantUrl';
import {
  StyleFooterSection,
  StyleFooterHeader,
  StyleFooterImage,
  StyleFooterTitle,
  StyleFooterLogo,
  StyleFooterContent,
  StyleInfo,
  StyleInfoItem,
  StyleInfoItemText,
  StyleOptions,
  StyleSocial,
  StyleSocialTitle,
  StyleInputGroup,
  StyleSocialIcons,
  SocialIcon,
} from './style';
import { Container } from '../../style';
import { colorPalette } from '@uikits/colors/Color';
import { StyleCustomBtn } from '@uikits/button/style';
import { StyleDivider } from '@uikits/divider/style';
import InputWidget from '@uikits/input/InputWidget';
import Menu from '@uikits/menu/Menu';
import MenuItem from '@uikits/menu/MenuItem';
import IconWidget from '@uikits/icon/IconWidget';
import logo from '@assets/img/brand/brand.png';
import MapIcon from '@assets/img/icon/tabler-map-pin.svg';
import phoneIcon from '@assets/img/icon/tabler-phone.svg';
import EnvelopeIcon from '@assets/img/icon/tabler-mail.svg';
import ArrowLeftIcon from '@assets/img/icon/Group 9.svg';
import ChevronUpIcon from '@assets/img/icon/Path 1802.svg';
import TelegramIcon from '@assets/img/icon/Path 492.svg';
import LinkedinIcon from '@assets/img/icon/linkedin.png';
import TwitterIcon from '@assets/img/icon/Path 507.svg';
import InstagramIcon from '@assets/img/icon/tabler-brand-instagram.svg';
import YoutubeIcon from '@assets/img/icon/tabler-brand-youtube.svg';
import { AUTH_URL } from '@config/constantUrl';
import FormWidget from '@uikits/form/FormWidget';
import ReactLoading from 'react-loading';
import { SETTING_API, SUBSCRIBERS } from '@config/constantApi';
import useHttpRequest from '@hooks/useHttpRequest';
import { useEffect } from 'react';
import { BASE_URL } from '@config/urls';
import { CustomSize } from '@utils/MediaQuery';
import { useSelector } from 'react-redux';
import { Icon } from '@pages/commonStyle';

const Footer = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const { postRequest, getRequest } = useHttpRequest();
  const [submitMsg, setSubmitMsg] = useState('');

  const { setting } = useSelector((state: any) => state.settingReducer);

  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = { email: event.target[0].value };
    if (!!value.email && validator.isEmail(value.email)) {
      setLoading(true);
      postRequest(SUBSCRIBERS, value)
        .then((resp) => {
          event.target[0].value = '';
          setLoading(false);
          setSuccess(true);
          setSubmitMsg('عملیات با موفقیت انجام شد');
          setOpenAlert(true);
        })
        .catch(() => {
          setLoading(false);
          setSuccess(false);
          setSubmitMsg('خطایی رخ داده است');
        });
    } else {
      setSuccess(false);
      setSubmitMsg('ایمیل وارد شده صحیح نمی باشد');
      setOpenAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Container isHidden={false}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={success ? 'success' : 'error'}
        >
          {submitMsg}
        </Alert>
      </Snackbar>
      <StyleFooterSection isHidden={location.pathname === AUTH_URL}>
        <StyleDivider Width={'100%'} Height={'2px'} Type={'Horizontal'} />

        <StyleFooterHeader>
          <StyleFooterImage>
            <Icon
              icon={`${BASE_URL}${setting?.image}`}
              style={{ width: '73px', height: '73px' }}
            />
            <StyleFooterTitle>{setting?.title}</StyleFooterTitle>
          </StyleFooterImage>
          <StyleCustomBtn
            onClick={scrollToTop}
            Width={'51px'}
            Height={'51px'}
            Background={colorPalette.gray_50}
          >
            <IconWidget
              alt='ChevronUp'
              src={ChevronUpIcon}
              width={'15px'}
              height={'7px'}
            />
          </StyleCustomBtn>
        </StyleFooterHeader>

        <StyleFooterContent>
          <StyleInfo>
            <StyleInfoItem>
              <IconWidget alt='map' src={MapIcon} />
              <StyleInfoItemText>{setting?.address}</StyleInfoItemText>
            </StyleInfoItem>

            <StyleInfoItem>
              <IconWidget alt='email' src={EnvelopeIcon} />
              <StyleInfoItemText>{setting?.email}</StyleInfoItemText>
            </StyleInfoItem>

            <StyleInfoItem>
              <IconWidget alt='phone' src={phoneIcon} />
              <StyleInfoItemText>{setting?.phoneNumber}</StyleInfoItemText>
            </StyleInfoItem>
          </StyleInfo>

          <StyleOptions>
            <StyleDivider Width={'2px'} Height={'140px'} Type={'Vertical'} />
            <Menu typeItem='Vertical' size='12px'>
              <MenuItem title='صفحه اصلی'>
                <NavLink to={LANDING_URL}>صفحه اصلی</NavLink>
              </MenuItem>
              <MenuItem title='محصولات'>
                <NavLink to={PRODUCTS_URL}>محصولات</NavLink>
              </MenuItem>
              <MenuItem title='درباره ما'>
                <NavLink to={ABOUT_US_URL}>درباره ما</NavLink>
              </MenuItem>
            </Menu>
          </StyleOptions>
          <StyleOptions>
            <StyleDivider Width={'2px'} Height={'140px'} Type={'Vertical'} />
            <Menu typeItem='Vertical' size='12px'>
              <MenuItem title='قوانین و مقررات'>
                <NavLink to={TERMS_URL}>قوانین و مقررات</NavLink>
              </MenuItem>
              <MenuItem title='باشگاه مشتریان'>
                <NavLink to={CUSTOMER_CLUB_URL}>باشگاه مشتریان</NavLink>
              </MenuItem>
              <MenuItem title='سوالات متداول'>
                <NavLink to={QUESTIONS_URL}>سوالات متداول</NavLink>
              </MenuItem>
            </Menu>
          </StyleOptions>
          <StyleSocial>
            <StyleSocialTitle>ارسال خبرنامه</StyleSocialTitle>
            <StyleInputGroup>
              <FormWidget onSubmit={handleSubmit}>
                <InputWidget
                  style={{
                    width: innerWidth > CustomSize.mobile ? '232px' : '220px',
                    height: '32px',
                  }}
                  inputProps={{
                    placeholder: 'پست الکترونیکی خود وارد کنید',
                    name: 'email',
                  }}
                />
                <StyleCustomBtn type='submit' Width={'33px'} Height={'34px'}>
                  {loading && (
                    <ReactLoading
                      type={'spinningBubbles'}
                      color={'#ffffff'}
                      height={30}
                      width={30}
                    />
                  )}
                  <IconWidget
                    alt='arrowLeft'
                    src={ArrowLeftIcon}
                    width={'20px'}
                    height={'11px'}
                  />
                </StyleCustomBtn>
              </FormWidget>
            </StyleInputGroup>

            <StyleSocialIcons>
              {!!setting?.socialMedia &&
                JSON.parse(setting?.socialMedia).map((item, index) => {
                  if (item.id === 1)
                    return (
                      <SocialIcon key={index}>
                        <a target='_blank' href={item.url}>
                          <IconWidget
                            alt='linkedin'
                            src={LinkedinIcon}
                            width={'17px'}
                            height={'17px'}
                          />
                        </a>
                      </SocialIcon>
                    );
                  if (item.id === 2)
                    return (
                      <SocialIcon key={index}>
                        <a target='_blank' href={item.url}>
                          <IconWidget
                            alt='instagram'
                            src={InstagramIcon}
                            width={'22px'}
                            height={'22px'}
                          />
                        </a>
                      </SocialIcon>
                    );
                  if (item.id === 3)
                    return (
                      <SocialIcon key={index}>
                        <a target='_blank' href={item.url}>
                          <IconWidget
                            alt='twitter'
                            src={TwitterIcon}
                            width={'20px'}
                            height={'16px'}
                          />
                        </a>
                      </SocialIcon>
                    );
                  if (item.id === 4)
                    return (
                      <SocialIcon key={index}>
                        <a target='_blank' href={item.url}>
                          <IconWidget
                            alt='youtube'
                            src={YoutubeIcon}
                            width={'25px'}
                            height={'25px'}
                          />
                        </a>
                      </SocialIcon>
                    );
                  if (item.id === 5)
                    return (
                      <SocialIcon key={index}>
                        <a target='_blank' href={item.url}>
                          <IconWidget
                            alt='telegram'
                            src={TelegramIcon}
                            width={'20px'}
                            height={'16px'}
                          />
                        </a>
                      </SocialIcon>
                    );
                })}
            </StyleSocialIcons>
          </StyleSocial>
        </StyleFooterContent>
      </StyleFooterSection>
    </Container>
  );
};

export default Footer;
