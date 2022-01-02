export namespace Table {
  export interface IProps {
    data: T[];
    columns: T[];
    title: string;
    description?: string;
    isSearch?: boolean;
    isPrint?: boolean;
    checkbox?: boolean;
  }
}
