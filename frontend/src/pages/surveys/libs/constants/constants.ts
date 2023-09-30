import {
  type StepsConfiguration,
  SURVEY_OTHER_CATEGORY,
  SurveyStep,
} from '#packages/survey/survey.js';

const TEXTAREA_ROWS_COUNT = 3;

const ONE_INDEX = 1;

const PREFERENCES_CATEGORIES: string[] = [
  'Get emotional support',
  'Reduce stress or anxiety',
  'Improve sleep quality',
  'Get over with depression',
  'Improve focus',
  SURVEY_OTHER_CATEGORY,
];

const FEELINGS_CATEGORIES: string[] = [
  'Good',
  'Stressed',
  'Sad',
  'Depressed',
  'Indifferent',
];

const GOALS_CATEGORIES: string[] = [
  'Manage stress and anxiety',
  'Improve sleep quality',
  'Cultivate a positive mindset',
  'Enhance emotional well-being',
  SURVEY_OTHER_CATEGORY,
];

const WORRIES_CATEGORIES: string[] = [
  'Work or school',
  'Money',
  'Relationships',
  'Health',
  'Family responsibilities',
  SURVEY_OTHER_CATEGORY,
];

const MEDITATION_EXPERIENCE_CATEGORIES: string[] = [
  'None',
  'I have tried it a few times',
  'I have meditated a lot',
];

const JOURNALING_EXPERIENCE_CATEGORIES: string[] = [
  'None',
  'I have tried it a few times',
  'I am doing this frequently',
];

const STEPS_CONFIGURATION = new Map([
  [
    SurveyStep.PREFERENCES,
    {
      stepCategories: PREFERENCES_CATEGORIES,
      question: 'What can we help you with?',
      type: 'checkbox',
      next: true,
    },
  ],
  [
    SurveyStep.FEELINGS,
    {
      stepCategories: FEELINGS_CATEGORIES,
      question: 'How have you been feeling lately?',
      type: 'checkbox',
      next: true,
      previous: true,
    },
  ],
  [
    SurveyStep.GOALS,
    {
      stepCategories: GOALS_CATEGORIES,
      question: 'What do you want to achieve with this Serenity?',
      type: 'checkbox',
      next: true,
      previous: true,
    },
  ],
  [
    SurveyStep.WORRIES,
    {
      stepCategories: WORRIES_CATEGORIES,
      question: 'What do you usually worry about most?',
      type: 'checkbox',
      next: true,
      previous: true,
    },
  ],
  [
    SurveyStep.MEDITATION_EXPERIENCE,
    {
      stepCategories: MEDITATION_EXPERIENCE_CATEGORIES,
      question: 'What is your experience with meditation?',
      type: 'radio',
      next: true,
      previous: true,
    },
  ],
  [
    SurveyStep.JOURNALING_EXPERIENCE,
    {
      stepCategories: JOURNALING_EXPERIENCE_CATEGORIES,
      question: 'What is your experience with journaling?',
      type: 'radio',
      submit: true,
      previous: true,
    },
  ],
]) as StepsConfiguration;

export { ONE_INDEX, STEPS_CONFIGURATION, TEXTAREA_ROWS_COUNT };
