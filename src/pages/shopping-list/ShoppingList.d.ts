import { ComponentType } from 'react';

export type ISteps = {
  id: number;
  name: string;
  Component: ComponentType<any>;
  icon: ComponentType<any>;
};
