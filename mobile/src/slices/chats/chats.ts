import {
  createChat,
  createMessage,
  generateReply,
  getAllChats,
  getCurrentChatMessages,
} from './actions';
import { actions } from './chats.slice';

const allActions = {
  ...actions,
  getAllChats,
  createChat,
  generateReply,
  getCurrentChatMessages,
  createMessage,
};

export { allActions as actions };
export { reducer } from './chats.slice';
