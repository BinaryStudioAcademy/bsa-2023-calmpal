import {
  createUserSurvey,
  deleteUser,
  getAuthenticatedUser,
  signIn,
  signOut,
  signUp,
} from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
  ...actions,
  signUp,
  signOut,
  signIn,
  deleteUser,
  getAuthenticatedUser,
  createUserSurvey,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
