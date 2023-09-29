import joi from 'joi';

import { SurveyValidationMessage } from '../enums/enums.js';
import { type SurveyOneInputDto } from '../types/types.js';

const createSurveyFormOne = joi.object<SurveyOneInputDto, true>({
  preferences: joi.string().required().messages({
    'array.min': SurveyValidationMessage.OPTION_REQUIRED,
  }),
});

export { createSurveyFormOne };
