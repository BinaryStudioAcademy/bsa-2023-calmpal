import {
  // GOALS_OTHER_CATEGORY,
  PREFERENCES_OTHER_CATEGORY,
  type SurveyInputDto,
  // WORRIES_OTHER_CATEGORY,
} from '#packages/survey/survey.js';

const TEXTAREA_ROWS_COUNT = 3;

const DEFAULT_SURVEY_PAYLOAD: SurveyInputDto = {
  preferences: [],
  // feelings: '',
  // goals: [],
  // worries: [],
  // meditationExperience: '',
  // journalingExperience: '',
  other: '',
};

const PREFERENCES_QUESTION = 'What can we help you with?';

const PREFERENCES_CATEGORIES: string[] = [
  'Get emotional support',
  'Reduce stress or anxiety',
  'Improve sleep quality',
  'Get over with depression',
  'Improve focus',
  PREFERENCES_OTHER_CATEGORY,
];

const FEELINGS_QUESTION = 'How have you been feeling lately?';

const FEELINGS_CATEGORIES: string[] = [
  'Good',
  'Stressed',
  'Sad',
  'Depressed',
  'Indifferent',
];

const GOALS_QUESTION = 'What do you want to achieve with this Serenity?';

const GOALS_CATEGORIES: string[] = [
  'Manage stress and anxiety',
  'Improve sleep quality',
  'Cultivate a positive mindset',
  'Enhance emotional well-being',
  'Other',
];

const WORRIES_QUESTION = 'What do you usually worry about most?';

const WORRIES_CATEGORIES: string[] = [
  'Work or school',
  'Money',
  'Relationships',
  'Health',
  'Family responsibilities',
  'Other',
];

const MEDITATION_EXPERIENCE_QUESTION =
  'What is your experience with meditation?';

const MEDITATION_EXPERIENCE_CATEGORIES: string[] = [
  'None',
  'I have tried it a few times',
  'I have meditated a lot',
];

const JOURNALING_EXPERIENCE_QUESTION =
  'What is your experience with journaling?';

const JOURNALING_EXPERIENCE_CATEGORIES: string[] = [
  'None',
  'I have tried it a few times',
  'I am doing this frequently',
];

export {
  DEFAULT_SURVEY_PAYLOAD,
  FEELINGS_CATEGORIES,
  FEELINGS_QUESTION,
  GOALS_CATEGORIES,
  GOALS_QUESTION,
  JOURNALING_EXPERIENCE_CATEGORIES,
  JOURNALING_EXPERIENCE_QUESTION,
  MEDITATION_EXPERIENCE_CATEGORIES,
  MEDITATION_EXPERIENCE_QUESTION,
  PREFERENCES_CATEGORIES,
  PREFERENCES_QUESTION,
  TEXTAREA_ROWS_COUNT,
  WORRIES_CATEGORIES,
  WORRIES_QUESTION,
};
