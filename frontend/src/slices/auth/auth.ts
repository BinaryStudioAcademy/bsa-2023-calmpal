import {
  createUserSurveyPreferences,
  getAuthenticatedUser,
  signUp,
} from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
  ...actions,
  signUp,
  getAuthenticatedUser,
  createUserSurveyPreferences,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
