import { Dispatch } from 'redux';

import { CURRENT_PAGE_URL, CURRENT_TABLE_PAGINATION } from '@redux/types';

export const TablePaginationAction = (value: any) => (dispatch: Dispatch) => {
  dispatch({
    type: CURRENT_TABLE_PAGINATION,
    payload: value,
  });
};

export const PageUrlAction = (value: any) => (dispatch: Dispatch) => {
  dispatch({
    type: CURRENT_PAGE_URL,
    payload: value,
  });
};
