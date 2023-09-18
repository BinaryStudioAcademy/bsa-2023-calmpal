import { createChat, getAllChats, getCurrentChatMessages } from './actions.js';
import { actions } from './chats.slice.js';

const allActions = {
  ...actions,
  getAllChats,
  createChat,
  getCurrentChatMessages,
};

export { allActions as actions };
export { reducer } from './chats.slice.js';
