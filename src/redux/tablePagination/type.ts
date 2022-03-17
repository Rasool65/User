import { CURRENT_PAGE_URL, CURRENT_TABLE_PAGINATION } from '@redux/types';

export interface ITablePaginationSchemaState {
  currentTablePagination: number;
  currentPageUrl: string;
}

export interface ITablePaginationAction {
  type?: typeof CURRENT_TABLE_PAGINATION;
  payload: any;
}

export interface ICurrentPageAction {
  type?: typeof CURRENT_PAGE_URL;
  payload: any;
}

export type TablePaginationActionsType =
  | ITablePaginationAction
  | ICurrentPageAction;
