import { getUser, signUp } from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
  ...actions,
  signUp,
  getUser,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
