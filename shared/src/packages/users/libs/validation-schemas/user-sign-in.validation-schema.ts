import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignInRequestDto } from '../types/types.js';

const userSignIn = joi.object<UserSignInRequestDto, true>({
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
  password: joi.string().trim().required().messages({
    'any.required': UserValidationMessage.PASSWORD_REQUIRED,
    'string.empty': UserValidationMessage.PASSWORD_REQUIRED,
  }),
});

export { userSignIn };
