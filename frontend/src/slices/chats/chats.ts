import {
  createChat,
  createMessage,
  getAllChats,
  getCurrentChatMessages,
} from './actions.js';
import { actions } from './chats.slice.js';

const allActions = {
  ...actions,
  getAllChats,
  createChat,
  getCurrentChatMessages,
  createMessage,
};

export { allActions as actions };
export { reducer } from './chats.slice.js';
