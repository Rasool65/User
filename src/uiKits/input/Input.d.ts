import {
  InputHTMLAttributes,
  CSSProperties,
  ReactNode,
  ReactElement,
} from 'react';

export namespace Input {
  export interface IProps {
    style?: CSSProperties;
    error?: boolean;
    helperText?: string;
    inputProps?: InputHTMLAttributes<any>;
    prefix?: any;
    suffix?: any;
    forwardeRef?: any;
    type?: string;
  }
}
