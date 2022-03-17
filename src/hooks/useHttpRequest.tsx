import { useSnackbar } from 'notistack';
import { AxiosResponse } from 'axios';

import { useApi } from './useApi';

const useHttpRequest = (baseType?: string) => {
  const { get, post, remove, put } = useApi(baseType);

  const getRequest = (url: string, config?: any): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await get(url, {
          validateStatus: (status) => {
            if (status >= 200 && status <= 204) {
              return true;
            }
          },
          ...config,
        });

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const postRequest = (
    url: string,
    body: any,
    config?: any
  ): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await post(url, body, {
          validateStatus: (status) => {
            if (status && status >= 200 && status <= 204) {
              return true;
            }
          },
          ...config,
        });
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteRequest = (url: string, body?: any): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await remove(url, body, {
          validateStatus: (status) => {
            if (status >= 200 && status <= 204) {
              return true;
            }
          },
        });

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateRequest = (url: string, body: any): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await put(url, body, {
          validateStatus: (status) => {
            if (status >= 200 && status <= 204) {
              return true;
            }
          },
        });

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    getRequest,
    postRequest,
    deleteRequest,
    updateRequest,
  };
};

export default useHttpRequest;
