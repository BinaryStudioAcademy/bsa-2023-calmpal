import { getAuthenticatedUser, signUp } from './actions';
import { actions } from './auth.slice';

const allActions = {
  ...actions,
  signUp,
  getAuthenticatedUser,
};

export { allActions as actions };
export { reducer } from './auth.slice';
