import { FunctionComponent, ComponentType } from 'react';

export namespace IUser {
  export type IUserPage = {
    id: number;
    Component: ComponentType<any>;
  };

  export interface IChangePage {
    onChagePage?: (pageIndex: number, id?: any) => void;
    handleSnackbar?: (status: boolean) => void;
    id?: number;
  }

  export const enum StatusEnum {
    ACCEPTED = 'ACCEPTED',
    PENDING = 'PENDING',
    DELIVERED = 'DELIVERED',
  }
}
