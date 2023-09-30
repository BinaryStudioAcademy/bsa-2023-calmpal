import { type ValueOf } from '#libs/types/types.js';

import { type SurveyStep } from '../enums/enums.js';

type SurveyStepsType = ValueOf<typeof SurveyStep>;

export { type SurveyStepsType };
