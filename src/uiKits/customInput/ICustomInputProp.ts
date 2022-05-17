import { CSSProperties } from '@material-ui/core/styles/withStyles';

export interface ICustomInputProp {
  name: string;
  placeholder?: string;
  value?: any;
  onChange?: Function;
  error?: boolean;
  helperText: string;
  style?: CSSProperties;
  maxLength?: number;
  type: 'text' | 'number' | 'money';
}
