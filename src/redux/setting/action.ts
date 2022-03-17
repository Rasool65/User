import { Dispatch } from 'redux';

import { SETTING } from '@redux/types';

export const settingApisAction = (value: any) => (dispatch: Dispatch) => {
  dispatch({
    type: SETTING,
    payload: value,
  });
};
