import { EventHandler } from 'react';
import { ITableColumn } from './ITableColumn';
export namespace TableP {
  export interface IProps {
    data: T[];
    columns: ITableColumn[];
    title?: string;
    description?: string;
    isSearch?: boolean;
    isPrint?: boolean;
    checkbox?: boolean;
    isExport?: boolean;
    exportFunction?: EventHandler;
    search?: EventHandler;
    showLineNumber?: boolean;
    pageSize?: number;
    pageNumber?: number;
    selectHigherRows?: boolean;
    onChangeSelection?: Function;
  }
}
