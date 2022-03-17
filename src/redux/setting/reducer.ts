import { SETTING, USER_INFO } from '@redux/types';
import { settingType, ISettingState } from './type';
import produce from 'immer';

const initState: ISettingState = {
  setting: {},
};

export const initializeSetting = (
  state: ISettingState,
  action: any
): ISettingState => {
  const r = produce(state, (draft) => {
    draft.setting = { ...action };
  });

  return r;
};

export const settingReducer = (state = initState, action: settingType) => {
  switch (action.type) {
    case SETTING:
      return initializeSetting(state, action.payload);

    default:
      return state;
  }
};
