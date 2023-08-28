import { createUserSurveyPreferences, signUp } from './actions';
import { actions } from './auth.slice';

const allActions = {
  ...actions,
  signUp,
  createUserSurveyPreferences,
};

export { allActions as actions };
export { reducer } from './auth.slice';
