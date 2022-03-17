import { LANDING_APIS, SHOPPINGLIST_COUNT } from '@redux/types';

export interface ILandingSchemaState {
  allApis: any;
}
export interface IShoppingSchemaState {
  shoppingListCount: number;
}

export interface ILandingApisAction {
  type?: typeof LANDING_APIS;
  payload: any;
}

export interface IShoppingListAction {
  type?: typeof SHOPPINGLIST_COUNT;
  payload: any;
}

export type landingActionsType = ILandingApisAction;
export type ShoppingListActionsType = IShoppingListAction;
