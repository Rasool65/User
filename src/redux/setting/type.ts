import { SETTING } from '../types';

export interface ISettingState {
  setting: any;
}

export interface ISettingAction {
  type?: typeof SETTING;
  payload?: any;
}

export type settingType = ISettingAction;
