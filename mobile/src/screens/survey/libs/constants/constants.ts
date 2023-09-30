import {
  SURVEY_OTHER_CATEGORY,
  type SurveyInputDto,
} from '#packages/survey/survey';

const TEXTAREA_ROWS_COUNT = 3;

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
  SURVEY_OTHER_CATEGORY,
];

export { DEFAULT_SURVEY_PAYLOAD, PREFERENCES_CATEGORIES, TEXTAREA_ROWS_COUNT };
