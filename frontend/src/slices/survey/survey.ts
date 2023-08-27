import {
  createUserSurveyPreferences,
  getUserSurveyPreferences,
} from './actions.js';
import { actions } from './survey.slice.js';

const allActions = {
  ...actions,
  createUserSurveyPreferences,
  getUserSurveyPreferences,
};

export { allActions as actions };
export { reducer } from './survey.slice.js';
