import { Dispatch } from 'redux';

import { PRE_FACTOR } from '@redux/types';

export const preFactorApisAction = (value: any) => (dispatch: Dispatch) => {
  dispatch({
    type: PRE_FACTOR,
    payload: value,
  });
};
