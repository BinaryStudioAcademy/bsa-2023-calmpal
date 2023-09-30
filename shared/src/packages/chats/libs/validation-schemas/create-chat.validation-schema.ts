import joi from 'joi';

import { ChatValidationMessage } from '../enums/enums.js';
import { type ChatCreateRequestDto } from '../types/chat-create-request-dto.type.js';

const createChat = joi.object<ChatCreateRequestDto>({
  message: joi.string().trim().required().messages({
    'any.required': ChatValidationMessage.MESSAGE_REQUIRED,
    'string.empty': ChatValidationMessage.MESSAGE_REQUIRED,
  }),
});

export { createChat };
