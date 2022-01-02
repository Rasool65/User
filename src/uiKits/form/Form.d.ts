import { CSSProperties, FormEvent } from 'react';

export namespace Form {
  export interface IItemProps {
    children?: any;
    lable?: string;
    className?: string;
    style?: CSSProperties;
    labelStyle?: CSSProperties;
    required?: boolean;
  }

  export interface IFormProps {
    children?: any;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  }
}
