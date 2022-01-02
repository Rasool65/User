import { USER_INFO } from '../types';

export interface IUserInfoState {
  userInfo: any;
}

export interface IUserInfoAction {
  type?: typeof USER_INFO;
  payload?: any;
}

export type userType = IUserInfoAction;
