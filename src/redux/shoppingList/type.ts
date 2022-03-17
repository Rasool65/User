import { SHOPPINGLIST_CHANGE, SHOPPINGLIST_COUNT } from '@redux/types';

export interface IShoppingSchemaState {
  shoppingListCount: number;
  shoppingListChange: boolean;
}
// export interface IShoppingChangeSchemaState {

//     shoppingListChange: boolean;
// }

export interface IShoppingListAction {
  type?: typeof SHOPPINGLIST_COUNT;
  payload: any;
}

export interface IShoppingListChangeAction {
  type?: typeof SHOPPINGLIST_CHANGE;
  payload: any;
}

export type ShoppingListActionsType =
  | IShoppingListAction
  | IShoppingListChangeAction;
