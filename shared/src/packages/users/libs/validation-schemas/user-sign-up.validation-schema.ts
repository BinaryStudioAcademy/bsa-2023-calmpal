import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const userSignUp = joi.object<UserSignUpRequestDto, true>({
  email: joi
    .string()
    .trim()
    .email({
      tlds: {
        allow: false,
      },
    })
    .required()
    .messages({
      'any.required': UserValidationMessage.EMAIL_REQUIRED,
      'string.empty': UserValidationMessage.EMAIL_REQUIRED,
      'string.email': UserValidationMessage.EMAIL_WRONG,
    }),
  password: joi.string().trim().required(),
});

export { userSignUp };
