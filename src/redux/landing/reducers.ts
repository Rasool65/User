import { LANDING_APIS, SHOPPINGLIST_COUNT } from '@redux/types';
import produce from 'immer';

import {
  ILandingSchemaState,
  landingActionsType,
  IShoppingSchemaState,
  ShoppingListActionsType,
} from './type';

const initState: ILandingSchemaState = {
  allApis: undefined,
};

const initStateShopping: IShoppingSchemaState = {
  shoppingListCount: 0,
};

export const initializelandingApis = (
  state: ILandingSchemaState,
  action: any
): ILandingSchemaState => {
  const r = produce(state, (draft) => {
    draft.allApis = action;
  });

  return r;
};

export const initializeShoppingListApis = (
  state: IShoppingSchemaState,
  action: any
): IShoppingSchemaState => {
  const r = produce(state, (draft) => {
    draft.shoppingListCount = action;
  });

  return r;
};

export const landingReducer = (
  state = initState,
  action: landingActionsType
) => {
  switch (action.type) {
    case LANDING_APIS:
      return initializelandingApis(state, action.payload);
    default:
      return state;
  }
};

export const ShoppingReducer = (
  state = initState,
  action: ShoppingListActionsType
) => {
  switch (action.type) {
    case SHOPPINGLIST_COUNT:
      return initializelandingApis(state, action.payload);

    default:
      return state;
  }
};
