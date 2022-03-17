import {
  CURRENT_PAGE_URL,
  CURRENT_TABLE_PAGINATION,
  SHOPPINGLIST_CHANGE,
  SHOPPINGLIST_COUNT,
} from '@redux/types';
import produce from 'immer';

import {
  ITablePaginationSchemaState,
  TablePaginationActionsType,
} from './type';

const initState: ITablePaginationSchemaState = {
  currentTablePagination: 1,
  currentPageUrl: '',
};

export const initializeTablePaginationApis = (
  state: ITablePaginationSchemaState,
  action: any
): ITablePaginationSchemaState => {
  const r = produce(state, (draft) => {
    draft.currentTablePagination = action;
  });

  return r;
};

export const initializeCurrentPageApis = (
  state: ITablePaginationSchemaState,
  action: any
): ITablePaginationSchemaState => {
  const r = produce(state, (draft) => {
    draft.currentPageUrl = action;
  });

  return r;
};

export const TablePaginationReducer = (
  state = initState,
  action: TablePaginationActionsType
) => {
  switch (action.type) {
    case CURRENT_TABLE_PAGINATION:
      return initializeTablePaginationApis(state, action.payload);

    case CURRENT_PAGE_URL:
      return initializeCurrentPageApis(state, action.payload);
    default:
      return state;
  }
};
