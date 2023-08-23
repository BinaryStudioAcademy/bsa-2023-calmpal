import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';
import { commonAuthFields } from './common-auth-fields.js';

const userSignUp = joi.object<UserSignUpRequestDto, true>({
  ...commonAuthFields,
  fullName: joi.string().trim().required().messages({
    'any.required': UserValidationMessage.NAME_REQUIRED,
    'string.empty': UserValidationMessage.NAME_REQUIRED,
  }),
});

export { userSignUp };
