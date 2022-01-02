import { useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useHttpRequest from '@hooks/useHttpRequest';
import axios, { CancelTokenSource } from 'axios';

import {
  MaintenanceModeWidget,
  ContactUswidget,
  TermsWidget,
  PrivaciesWidget,
  AuthWidget,
  LandingWidget,
  AboutUsWidget,
  QuestionsWidget,
  ProductWidget,
  ProductsWidget,
  ShoppingListWidget,
  PreFactorWidget,
} from '@pages/index';

import {
  ABOUT_US_URL,
  AUTH_URL,
  LANDING_URL,
  QUESTIONS_URL,
  PRODUCT_URL,
  PRODUCTS_URL,
  USER_PANEL,
  SHOPPING_LIST_URL,
  PRE_FACTOR_URL,
  CONTACT_US_URL,
  TERMS_URL,
  PRIVACIES_URL,
} from '@config/constantUrl';
import userPanel from '@pages/user-panel';
import { CUSTOMER_PROFILE, SETTING_API } from '@config/constantApi';
import { userApisAction } from '@redux/userInfo/action';
import { settingApisAction } from '@redux/setting/action';
import { _TOKEN_NAME } from '@config/constantApi';
import PrivateRoute from './PrivateRoutes';
import { MAINTENANCE_MODE_URL } from './../config/constantUrl';
import Error404 from '@pages/errors/404';

let source: CancelTokenSource;

export const MainRoutes = () => {
  source = axios.CancelToken.source();

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { getRequest } = useHttpRequest();

  const getUserInfo = () => {
    getRequest(CUSTOMER_PROFILE)
      .then((res) => {
        dispatch(userApisAction(res.data));
      })
      .catch(() => {
        return;
      });
  };

  const getSetting = () => {
    getRequest(SETTING_API)
      .then((resp) => {
        dispatch(settingApisAction(resp.data));
      })
      .catch(() => {
        return;
      });
  };

  const getGeneralData = () => {
    getSetting();
    getUserInfo();
  };

  useEffect(() => {
    const token = localStorage.getItem(_TOKEN_NAME) || '';
    if (!!token) {
      getGeneralData();
    }
  }, [localStorage.getItem(_TOKEN_NAME)]);

  return (
    <>
      <Switch>
        {/* Auth Route */}
        <Route exact={true} path={AUTH_URL} component={AuthWidget} />

        {/* Landing Route */}
        <PrivateRoute
          exact={true}
          path={LANDING_URL}
          component={LandingWidget}
        />

        {/* AboutUs Route */}
        <PrivateRoute
          exact={true}
          path={ABOUT_US_URL}
          component={AboutUsWidget}
        />

        {/* Questions Route */}
        <PrivateRoute
          exact={true}
          path={QUESTIONS_URL}
          component={QuestionsWidget}
        />

        {/* Product Route */}
        <PrivateRoute
          exact={true}
          path={`${PRODUCT_URL}/:id?`}
          component={ProductWidget}
        />

        {/* Products Route */}
        <PrivateRoute
          exact={true}
          path={PRODUCTS_URL}
          component={ProductsWidget}
        />
        <PrivateRoute
          exact={true}
          path={`${PRODUCTS_URL}/:id?`}
          component={ProductsWidget}
        />

        {/* shoppingList Route */}
        <PrivateRoute
          exact={true}
          path={SHOPPING_LIST_URL}
          component={ShoppingListWidget}
        />

        {/* PreFactor Route */}
        <PrivateRoute
          exact={true}
          path={PRE_FACTOR_URL}
          component={PreFactorWidget}
        />

        {/* User panel Route */}
        <PrivateRoute exact={false} path={USER_PANEL} component={userPanel} />

        {/* User Maintenance Route */}
        <Route
          exact={true}
          path={MAINTENANCE_MODE_URL}
          component={MaintenanceModeWidget}
        />
        {/* User ContactUs Route */}
        <Route exact={true} path={CONTACT_US_URL} component={ContactUswidget} />

        {/* User Terms Route */}
        <Route exact={true} path={TERMS_URL} component={TermsWidget} />

        {/* User Privacies Route */}
        <Route exact={true} path={PRIVACIES_URL} component={PrivaciesWidget} />

        <Route path={'*'} component={Error404} />
      </Switch>
    </>
  );
};
