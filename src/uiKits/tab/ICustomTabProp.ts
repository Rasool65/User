import { ICustomTabItem } from './ICustomTabItem';
export interface ICustomTabProp {
  tabItems: ICustomTabItem[];
  onChangeTab?: Function;
  loading?: boolean;
}
