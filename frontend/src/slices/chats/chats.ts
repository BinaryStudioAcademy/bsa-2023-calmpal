import { createChat, getAllChats } from './actions.js';
import { actions } from './chats.slice.js';

const allActions = {
  ...actions,
  getAllChats,
  createChat,
};

export { allActions as actions };
export { reducer } from './chats.slice.js';
