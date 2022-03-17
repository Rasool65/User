import { PRE_FACTOR } from '@redux/types';
import { preFactorType, IPreFactorAction, IPreFactorState } from './type';
import produce from 'immer';

const initState: IPreFactorState = {
  preFactor: {},
};

export const initializePreFactor = (
  state: IPreFactorState,
  action: any
): IPreFactorState => {
  const r = produce(state, (draft) => {
    draft.preFactor = { ...action };
  });

  return r;
};

export const preFactorReducer = (state = initState, action: preFactorType) => {
  switch (action.type) {
    case PRE_FACTOR:
      return initializePreFactor(state, action.payload);

    default:
      return state;
  }
};
