import { Dispatch } from 'redux';

import { USER_INFO } from '@redux/types';

export const userApisAction = (value: any) => (dispatch: Dispatch) => {
  dispatch({
    type: USER_INFO,
    payload: value,
  });
};
