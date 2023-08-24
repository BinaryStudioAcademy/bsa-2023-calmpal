import joi from 'joi';

import { UserValidationMessage } from '../enums/user-validation-message.enum.js';
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
  password: joi.string().trim().required(),
});

export { userSignIn };
