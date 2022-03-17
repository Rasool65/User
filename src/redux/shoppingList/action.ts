import { Dispatch } from 'redux';

import { SHOPPINGLIST_COUNT, SHOPPINGLIST_CHANGE } from '@redux/types';

export const ShoppingListCountAction = (value: any) => (dispatch: Dispatch) => {
  dispatch({
    type: SHOPPINGLIST_COUNT,
    payload: value,
  });
};

export const ShoppingListChangeAction =
  (value: any) => (dispatch: Dispatch) => {
    dispatch({
      type: SHOPPINGLIST_CHANGE,
      payload: value,
    });
  };
