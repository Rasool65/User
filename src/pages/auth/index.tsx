import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Container } from '../../style';
import {
  StyleAvatar,
  StyleContainer,
  StyleLogin,
  StyleTitle,
  StyleSubTitle,
} from './style';
import AuthImage from '@assets/img/KKKP9126-1.jpg';
import KalehLogo from '@assets/img/Kaleh_logo.png';
import { AUTH_URL, LANDING_URL } from '@config/constantUrl';
import { IAuth } from './Auth';
import Login from './Login';
import Register from './Register';
import MobileCode from './MobileCode';
import ForgetPassword from './ForgetPassword';
import { StyleLogo } from '@pages/commonStyle';
import { SETTING_API } from '@config/constantApi';
import useHttpRequest from '@hooks/useHttpRequest';
import { BASE_URL } from '@config/urls';

const AuthPage: IAuth.IAuthPage[] = [
  {
    id: 0,
    Component: Login,
    Title: 'ورود به سیستم',
    Subtitle: '',
  },
  {
    id: 1,
    Component: Register,
    Title: 'ورود با رمز یک بار مصرف',
    Subtitle: '',
  },
  {
    id: 2,
    Component: MobileCode,
    Title: 'ارسال کد تایید',
    Subtitle: '',
  },
  {
    id: 3,
    Component: ForgetPassword,
    Title: 'فراموشی رمز عبور',
    Subtitle: '',
  },
];

const Auth = () => {
  const history = useHistory();
  const { getRequest } = useHttpRequest();
  const [loginBannerUrl, setLoginBannerUrl] = useState('');
  const [CurrentPage, setCurrentPage] = useState<IAuth.IAuthPage>(AuthPage[0]);
  const [pageData, setPageData] = useState<any>({});

  const handleChangePage = (page: number, data?: any) => {
    setPageData(data);
    setCurrentPage(AuthPage[page]);
  };
  const location = useLocation();

  const getMainPageBanner = () => {
    getRequest(`${SETTING_API}/bannerspath?BannerType=2`).then((resp) => {
      setLoginBannerUrl(resp.data);
    });
  };
  useEffect(() => {
    getMainPageBanner();
  }, []);
  return (
    <Container isHidden={location.pathname === AUTH_URL}>
      <StyleContainer>
        <StyleLogin>
          <StyleLogo
            src={KalehLogo}
            onClick={() => history.push(LANDING_URL)}
          />

          <StyleTitle>{CurrentPage.Title}</StyleTitle>

          <StyleSubTitle>{CurrentPage.Subtitle}</StyleSubTitle>

          <CurrentPage.Component
            onChagePage={handleChangePage}
            pageData={pageData}
          />
        </StyleLogin>
        <StyleAvatar src={`${BASE_URL}${loginBannerUrl}`} />
      </StyleContainer>
    </Container>
  );
};

export default Auth;
