import { EventHandler } from 'react';

export namespace Icon {
  export interface IProps {
    height?: string;
    width?: string;
    alt?: string;
    src?: string;
    style?: React.CSSProperties;
    onClick?: EventHandler;
  }
}
