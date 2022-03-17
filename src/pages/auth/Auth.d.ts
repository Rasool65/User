import { FunctionComponent, ComponentType } from 'react';

export namespace IAuth {
  export type IAuthPage = {
    id: number;
    Component: ComponentType<any>;
    Title: string;
    Subtitle: string;
  };

  export interface IChangePage {
    onChagePage?: (pageIndex: number, pageData?: any) => void;
    pageData?: any;
  }
}
