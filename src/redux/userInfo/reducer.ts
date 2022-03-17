import { USER_INFO } from '@redux/types';
import { userType, IUserInfoState } from './type';
import produce from 'immer';

const initState: IUserInfoState = {
  userInfo: undefined,
};

export const initializeUserInfo = (
  state: IUserInfoState,
  action: any
): IUserInfoState => {
  const r = produce(state, (draft) => {
    draft.userInfo = action;
  });

  return r;
};

export const userInfoReducer = (state = initState, action: userType) => {
  switch (action.type) {
    case USER_INFO:
      return initializeUserInfo(state, action.payload);

    default:
      return state;
  }
};
