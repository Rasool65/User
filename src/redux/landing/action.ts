import { Dispatch } from 'redux';

import { LANDING_APIS, SHOPPINGLIST_COUNT } from '@redux/types';

export const landingApisAction = (value: any) => (dispatch: Dispatch) => {
  dispatch({
    type: LANDING_APIS,
    payload: value,
  });
};

export const ShoppingListCountAction = (value: any) => (dispatch: Dispatch) => {
  dispatch({
    type: SHOPPINGLIST_COUNT,
    payload: value,
  });
};
