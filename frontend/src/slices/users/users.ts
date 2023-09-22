import { deleteUser } from './actions.js';
import { actions } from './users.slice.js';

const allActions = {
  ...actions,
  deleteUser,
};

export { allActions as actions };
export { reducer } from './users.slice.js';
