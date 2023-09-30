import { type StepsType } from './steps.types.js';

type RenderSteps = {
  stepCategories: string[];
  question: StepsType;
  type: 'checkbox' | 'radio';
  next?: boolean;
  previous?: boolean;
  submit?: boolean;
};

export { type RenderSteps };
