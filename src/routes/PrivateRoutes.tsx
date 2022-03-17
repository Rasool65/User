import React, { useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { validate as uuidValidate } from 'uuid';
import { _TOKEN_NAME, _UUID } from '@config/constantApi';
import { AUTH_URL, MAINTENANCE_MODE_URL } from '@config/constantUrl';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { setting } = useSelector((state: any) => state.settingReducer);
  return (
    <Route
      {...rest}
      render={(props) =>
        uuidValidate(localStorage.getItem(_UUID)) &&
        localStorage.getItem(_TOKEN_NAME) ? (
          setting.maintenanceMode ? (
            <Redirect to={MAINTENANCE_MODE_URL} />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to={AUTH_URL} />
        )
      }
    />
  );
};

export default PrivateRoute;
