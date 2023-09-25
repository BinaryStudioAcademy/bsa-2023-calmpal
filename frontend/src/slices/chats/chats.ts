import {
  createChat,
  createMessage,
  deleteChat,
  getAllChats,
  getCurrentChatMessages,
} from './actions.js';
import { actions } from './chats.slice.js';

const allActions = {
  ...actions,
  getAllChats,
  createChat,
  deleteChat,
  getCurrentChatMessages,
  createMessage,
};

export { allActions as actions };
export { reducer } from './chats.slice.js';
