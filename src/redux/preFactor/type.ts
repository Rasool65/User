import { PRE_FACTOR } from '../types';

export interface IPreFactorState {
  preFactor: any;
}

export interface IPreFactorAction {
  type?: typeof PRE_FACTOR;
  payload?: any;
}

export type preFactorType = IPreFactorAction;
