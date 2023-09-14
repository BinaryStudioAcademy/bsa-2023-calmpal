import joi from 'joi';

import {
  ChatMessageValidationMessage,
  ChatMessageValidationRule,
} from '../enums/enums.js';
import { type ChatMessageCreateRequestDto } from '../types/types.js';

const createMessageValidationSchema = joi.object<
  ChatMessageCreateRequestDto,
  true
>({
  message: joi
    .string()
    .trim()
    .max(ChatMessageValidationRule.MAXIMUM_MESSAGE_LENGTH)
    .required()
    .messages({
      'any.required': ChatMessageValidationMessage.MESSAGE_REQUIRED,
      'string.empty': ChatMessageValidationMessage.MESSAGE_REQUIRED,
      'string.max': ChatMessageValidationMessage.MAXIMUM_MESSAGE_LENGTH,
    }),
  senderId: joi.number().integer().strict().required().messages({
    'any.required': ChatMessageValidationMessage.USER_ID_IS_REQUIRED,
    'number.base': ChatMessageValidationMessage.USER_ID_MUST_BE_NUMBER,
  }),
});

export { createMessageValidationSchema };
