import {
  createUserSurveyPreferences,
  getAuthenticatedUser,
  signUp,
} from './actions';
import { actions } from './auth.slice';

const allActions = {
  ...actions,
  signUp,
  getAuthenticatedUser,
  createUserSurveyPreferences,
};

export { allActions as actions };
export { reducer } from './auth.slice';
