import { MESSAGE_COUNT } from '@redux/types';

export interface IMessageSchemaState {
  newMessageCount: number;
  hasNewMessage: boolean;
}

export interface IMessageCountAction {
  type?: typeof MESSAGE_COUNT;
  payload: number;
}

export type MessageCountActionsType = IMessageCountAction;
