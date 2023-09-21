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
  isGeneratedByChatbot: joi.boolean().required().messages({
    'any.required':
      ChatMessageValidationMessage.IS_GENERATED_BY_CHATBOT_IS_REQUIRED,
  }),
});

export { createMessageValidationSchema };
