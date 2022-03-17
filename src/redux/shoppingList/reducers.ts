import { SHOPPINGLIST_CHANGE, SHOPPINGLIST_COUNT } from '@redux/types';
import produce from 'immer';

import { IShoppingSchemaState, ShoppingListActionsType } from './type';

const initState: IShoppingSchemaState = {
  shoppingListCount: 0,
  shoppingListChange: false,
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

export const initializeShoppingListChangeApis = (
  state: IShoppingSchemaState,
  action: any
): IShoppingSchemaState => {
  const r = produce(state, (draft) => {
    draft.shoppingListChange = action;
  });

  return r;
};

export const ShoppingReducer = (
  state = initState,
  action: ShoppingListActionsType
) => {
  switch (action.type) {
    case SHOPPINGLIST_COUNT:
      return initializeShoppingListApis(state, action.payload);

    case SHOPPINGLIST_CHANGE:
      return initializeShoppingListChangeApis(state, action.payload);

    default:
      return state;
  }
};
