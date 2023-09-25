import { createChat, deleteChat, getAllChats } from './actions';
import { actions } from './chats.slice';

const allActions = {
  ...actions,
  deleteChat,
  getAllChats,
  createChat,
};

export { allActions as actions };
export { reducer } from './chats.slice';
