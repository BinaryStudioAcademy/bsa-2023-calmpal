import {
  PREFERENCES_OTHER_CATEGORY,
  type SurveyMultipleInputDto,
  type SurveyOneInputDto,
} from '#packages/survey/survey';

const TEXTAREA_ROWS_COUNT = 3;

const DEFAULT_SURVEY_MULTIPLE_PAYLOAD: SurveyMultipleInputDto = {
  preferences: [],
  other: '',
};

const DEFAULT_SURVEY_ONE_PAYLOAD: SurveyOneInputDto = {
  preferences: '',
};

const PREFERENCES_CATEGORIES: string[] = [
  'Get emotional support',
  'Reduce stress or anxiety',
  'Improve sleep quality',
  'Get over with depression',
  'Improve focus',
  PREFERENCES_OTHER_CATEGORY,
];

const FEELING_CATEGORIES: string[] = [
  'Good',
  'Streesed',
  'Sad',
  'Depressed',
  'Indifferent',
  PREFERENCES_OTHER_CATEGORY,
];

const GOALS_CATEGORIES: string[] = [
  'Manage stress and anxiety',
  'Improve sleep quality',
  'Cultivate a positive mindset',
  'Enhance emotional well-being',
  PREFERENCES_OTHER_CATEGORY,
];

const WORRIES_CATEGORIES: string[] = [
  'Work or school',
  'Money',
  'Relationships',
  'Health',
  'Family responsibilities',
  PREFERENCES_OTHER_CATEGORY,
];

const MEDITATION_EXPERIENCE_CATEGORIES: string[] = [
  'None',
  'I have tried a few times',
  'I have meditated a lot',
];

const JOURNALING_EXPERIENCE_CATEGORIES: string[] = [
  'None',
  'I have tried a few times',
  'I am doing this frequently',
];

export {
  DEFAULT_SURVEY_MULTIPLE_PAYLOAD,
  DEFAULT_SURVEY_ONE_PAYLOAD,
  FEELING_CATEGORIES,
  GOALS_CATEGORIES,
  JOURNALING_EXPERIENCE_CATEGORIES,
  MEDITATION_EXPERIENCE_CATEGORIES,
  PREFERENCES_CATEGORIES,
  TEXTAREA_ROWS_COUNT,
  WORRIES_CATEGORIES,
};
