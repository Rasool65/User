import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  USER_PANEL,
  USER_PANEL_DASHBOARD,
  USER_PANEL_OPEN_ORDERS,
  USER_PANEL_PAST_ORDERS,
  USER_PANEL_ADDRESSES,
  USER_PANEL_MESSAGES,
  USER_PANEL_PROFILE,
  USER_PANEL_PAYMENT_LIST,
  USER_PANEL_UNSETTLED_ACCOUNTS,
  USER_PANEL_USERS_LIST,
  USER_PANEL_TRANSACTION,
} from '@config/constantUrl';
import UserPanelDashboard from './UserPanelDashboard';
import UserPanelOpenOrders from './OpenOrders';
import UserPanelPastOrders from './PastOrders';
import UserPanelPayments from './Paymentlist';
import UserPanelUnsettledAccounts from './UnsettledAccounts';
import UserPanelAddresses from './UserPanelAddresses';
import UserPanelMessages from './message/index';
import UserPanelProfile from './profile/index';
import Transaction from './Transaction';
import { CUSTOMER_PROFILE } from '@config/constantApi';
import { userApisAction } from '@redux/userInfo/action';
import { useDispatch, useSelector } from 'react-redux';
import useHttpRequest from '@hooks/useHttpRequest';
import { _TOKEN_NAME } from '@config/constantApi';

const UserPanelRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const { getRequest } = useHttpRequest();
  const { userInfo } = useSelector((state: any) => state.userInfoReducer);

  const getUserInfo = () => {
    getRequest(CUSTOMER_PROFILE)
      .then((res) => {
        dispatch(userApisAction(res.data));
      })
      .catch(() => {
        return;
      });
  };

  useEffect(() => {
    const token = localStorage.getItem(_TOKEN_NAME) || '';
    if (!!token && !!userInfo) {
      getUserInfo();
    }
  }, [localStorage.getItem(_TOKEN_NAME)]);

  return (
    <>
      {children}
      <Switch>
        {/* Redirect To Dashboard Route */}
        <Route
          exact={true}
          path={USER_PANEL}
          render={() => <Redirect to={USER_PANEL_DASHBOARD} />}
        />

        {/* User Panel Dashboard Route */}
        <Route
          exact={true}
          path={USER_PANEL_DASHBOARD}
          component={UserPanelDashboard}
        />

        {/* User Panel Open Orders Route */}
        <Route
          exact={true}
          path={USER_PANEL_OPEN_ORDERS}
          component={UserPanelOpenOrders}
        />

        {/* User Panel Past Orders Route */}
        <Route
          exact={true}
          path={USER_PANEL_PAST_ORDERS}
          component={UserPanelPastOrders}
        />

        {/* User Panel Payments Route */}
        <Route
          exact={true}
          path={`${USER_PANEL_PAYMENT_LIST}/:id?`}
          component={UserPanelPayments}
        />

        {/* User Panel Unsettled Accounts Route */}
        <Route
          exact={true}
          path={USER_PANEL_UNSETTLED_ACCOUNTS}
          component={UserPanelUnsettledAccounts}
        />

        {/* User Panel Transaction Route */}
        <Route
          exact={true}
          path={USER_PANEL_TRANSACTION}
          component={Transaction}
        />

        {/* User Panel Addresses Route */}
        <Route
          exact={true}
          path={USER_PANEL_ADDRESSES}
          component={UserPanelAddresses}
        />

        {/* User Panel Messages Route */}
        <Route
          exact={true}
          path={USER_PANEL_MESSAGES}
          component={UserPanelMessages}
        />

        {/* User Panel Profile Route */}
        <Route
          exact={true}
          path={USER_PANEL_PROFILE}
          component={UserPanelProfile}
        />

        {/* User Panel Users Route */}
        {/* <Route exact={true} path={USER_PANEL_USERS_LIST} component={UserPanelUsers} /> */}
      </Switch>
    </>
  );
};

export default UserPanelRoutes;
