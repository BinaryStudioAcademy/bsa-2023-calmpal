import {
  createUserSurvey,
  getAuthenticatedUser,
  signIn,
  signOut,
  signUp,
} from './actions';
import { actions } from './auth.slice';

const allActions = {
  ...actions,
  signUp,
  signOut,
  signIn,
  getAuthenticatedUser,
  createUserSurvey,
};

export { allActions as actions };
export { reducer } from './auth.slice';
