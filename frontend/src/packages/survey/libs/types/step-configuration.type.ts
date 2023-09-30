import { type SurveyStepsType } from './survey-steps.type.js';

type StepConfiguration = {
  stepCategories: string[];
  question: SurveyStepsType;
  type: 'checkbox' | 'radio';
  next?: boolean;
  previous?: boolean;
  submit?: boolean;
};

export { type StepConfiguration };
