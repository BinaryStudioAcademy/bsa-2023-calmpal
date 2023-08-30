import {
  createUserSurveyPreferences,
  getAuthenticatedUser,
  signIn,
  signUp,
} from './actions';
import { actions } from './auth.slice';

const allActions = {
  ...actions,
  signUp,
  signIn,
  getAuthenticatedUser,
  createUserSurveyPreferences,
};

export { allActions as actions };
export { reducer } from './auth.slice';
