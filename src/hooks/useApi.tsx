import axios, { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import { AUTH_URL } from '@config/constantUrl';
import { _TOKEN_NAME, _UUID } from '@config/constantApi';
import { BASE_URL } from '@config/urls';

let delayBetweenErrors: number;
let lastErrorTime: number = 0;

export const useApi = (baseType?: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  let instance: any;

  const token = localStorage.getItem(_TOKEN_NAME) || '';

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  instance = axios.create({
    baseURL: BASE_URL,
    headers,
  });

  // API Request interceptor
  // instance.interceptors.request.use(config => {
  //     // const jwtToken = localStorage.getItem('card_token');

  //     //   if (jwtToken) {
  //     //     config.headers['card_token'] = jwtToken
  //     //   }

  //     //   if (!jwtToken && !config.headers['public-request']) {
  //     //     this.history.push('/')
  //     //     window.location.reload();
  //     //   }

  //     return config;
  // }, error => {
  //     //   // Do something with request error here
  //     //   // notification.error({
  //     //   // 	message: 'Error'
  //     //   // })
  //     Promise.reject(error);
  // }

  // );

  // API respone interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const notificationParam = {
        message: '',
      };

      delayBetweenErrors = Date.now() - lastErrorTime;
      lastErrorTime = Date.now();

      // Remove token and redirect if delayBetweenErrors is more than .5 second
      if (error.response.status === 401 && delayBetweenErrors > 500) {
        localStorage.removeItem(_TOKEN_NAME);
        localStorage.removeItem(_UUID);
        history.push(AUTH_URL);
        notificationParam.message = 'لطفاً مجدد لاگین کنید';
      }

      if (error.response.status === 500) {
        notificationParam.message = 'خطای ارتباط با سرور';
      }

      if (
        (error.response.status === 400 ||
          (error.response.status > 401 && error.response.status < 500)) &&
        delayBetweenErrors > 500
      ) {
        notificationParam.message =
          error.response && error.response.data && error.response.data
            ? error.response.data.message
            : 'ارتباط با سرور برقرار نمی باشد';
      }

      if (notificationParam.message.length) {
        enqueueSnackbar(notificationParam.message, {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }

      return Promise.reject(error);
    }
  );

  const get = (url: string, config?: any): Promise<AxiosResponse> => {
    return instance.get(url, config);
  };

  const post = (
    url: string,
    data?: any,
    config?: any
  ): Promise<AxiosResponse> => {
    return instance.post(url, data, config);
  };

  const put = (
    url: string,
    data?: any,
    config?: any
  ): Promise<AxiosResponse> => {
    return instance.put(url, data, config);
  };

  const remove = (
    url: string,
    data?: any,
    config?: any
  ): Promise<AxiosResponse> => {
    return instance.delete(
      url,
      {
        data,
      },
      config
    );
  };

  return {
    get,
    post,
    put,
    remove,
  };
};
