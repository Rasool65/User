import { COLLAPSE_SIDER, LOGIN_PAGE } from '../types';

export interface ILayoutState {
  openSider: boolean;
  loginPage: boolean;
  userProfile: any;
}

export interface ISiderStatusAction {
  type?: typeof COLLAPSE_SIDER;
  payload?: boolean;
}
export interface ILoginPageAction {
  type?: typeof LOGIN_PAGE;
  payload?: boolean;
}

export type ILayoutType = ISiderStatusAction | ILoginPageAction;
