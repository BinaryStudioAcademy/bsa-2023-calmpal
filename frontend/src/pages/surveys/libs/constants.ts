import { type SurveyInputDto } from '#packages/survey/survey.js';

const TEXTAREA_MAX_LENGTH = 1000;

const DEFAULT_SURVEY_PAYLOAD: SurveyInputDto = {
  options: [],
  textarea: '',
};

const PREFERENCES_CATEGORIES: string[] = [
  'Get emotional support',
  'Reduce stress or anxiety',
  'Improve sleep quality',
  'Get over with depression',
  'Improve focus',
];

export { DEFAULT_SURVEY_PAYLOAD, PREFERENCES_CATEGORIES, TEXTAREA_MAX_LENGTH };
