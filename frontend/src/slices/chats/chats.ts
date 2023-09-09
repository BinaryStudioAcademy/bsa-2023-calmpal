import { getAllChats } from './actions.js';
import { actions } from './chats.slice.js';

const allActions = {
  ...actions,
  getAllChats,
};

export { allActions as actions };
export { reducer } from './chats.slice.js';
