import {
  createChat,
  createMessage,
  getAllChats,
  getCurrentChatMessages,
} from './actions';
import { actions } from './chats.slice';

const allActions = {
  ...actions,
  getAllChats,
  createChat,
  getCurrentChatMessages,
  createMessage,
};

export { allActions as actions };
export { reducer } from './chats.slice';
