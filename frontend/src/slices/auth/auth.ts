import {
  createUserSurvey,
  getAuthenticatedUser,
  signIn,
  signUp,
} from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
  ...actions,
  signUp,
  signIn,
  getAuthenticatedUser,
  createUserSurvey,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
