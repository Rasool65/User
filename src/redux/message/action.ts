import { Dispatch } from 'redux';

import { MESSAGE_COUNT } from '@redux/types';


export const MessageCountAction = (value: number) => (dispatch: Dispatch) => {
  dispatch({
    type: MESSAGE_COUNT,
    payload: value,
  });
};
