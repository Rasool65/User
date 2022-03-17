import { MESSAGE_COUNT } from '@redux/types';
import { MessageCountActionsType, IMessageSchemaState } from './type';

const initState: IMessageSchemaState = {
  newMessageCount: 0,
  hasNewMessage: false,
};

export const MessageReducer = (
  state = initState,
  action: MessageCountActionsType
) => {
  switch (action.type) {
    case MESSAGE_COUNT:
      return {
        ...state,
        newMessageCount: action.payload,
        hasNewMessage: action.payload > 0,
      };
    default:
      return state;
  }
};
