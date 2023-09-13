import joi from 'joi';

import { ChatValidationMessage } from '../enums/enums.js';
import { type ChatRequestDto } from '../types/types.js';

const createChat = joi.object<ChatRequestDto, true>({
  name: joi.string().trim().required().messages({
    'any.required': ChatValidationMessage.NAME_REQUIRED,
    'string.empty': ChatValidationMessage.NAME_REQUIRED,
  }),
});

export { createChat };
