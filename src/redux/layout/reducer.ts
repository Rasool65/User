import { ILayoutState, ILayoutType } from './type';
import { COLLAPSE_SIDER, LOGIN_PAGE } from '../types';

const initState: ILayoutState = {
  openSider: false,
  loginPage: true,
  userProfile: undefined,
};

export const layoutReducer = (state = initState, action: ILayoutType) => {
  switch (action.type) {
    case COLLAPSE_SIDER:
      return {
        ...state,
        openSider: action.payload,
      };
    case LOGIN_PAGE:
      return {
        ...state,
        loginPage: action.payload,
      };

    default:
      return state;
  }
};
