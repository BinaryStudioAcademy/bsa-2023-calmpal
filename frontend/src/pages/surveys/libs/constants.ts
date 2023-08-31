import {
  PREFERENCES_OTHER_CATEGORY,
  type SurveyInputDto,
} from '#packages/survey/survey.js';

const TEXTAREA_MAX_LENGTH = 1000;
const TEXTAREA_ROWS_COUNT = 3;
const SPLICE_CATEGORIES_COUNT = 1;

const DEFAULT_SURVEY_PAYLOAD: SurveyInputDto = {
  preferences: [],
  other: '',
};

const PREFERENCES_CATEGORIES: string[] = [
  'Get emotional support',
  'Reduce stress or anxiety',
  'Improve sleep quality',
  'Get over with depression',
  'Improve focus',
  PREFERENCES_OTHER_CATEGORY,
];

export {
  DEFAULT_SURVEY_PAYLOAD,
  PREFERENCES_CATEGORIES,
  SPLICE_CATEGORIES_COUNT,
  TEXTAREA_MAX_LENGTH,
  TEXTAREA_ROWS_COUNT,
};
