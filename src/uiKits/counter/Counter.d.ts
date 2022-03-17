export namespace Counter {
  export interface IProps {
    initial: number;
    data?: any;
    handleChange?: (count: number, data?: any) => void;
  }
}
