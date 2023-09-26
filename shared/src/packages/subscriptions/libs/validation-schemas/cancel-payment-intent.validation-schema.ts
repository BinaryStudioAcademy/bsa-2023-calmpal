import joi from 'joi';

import { SubscriptionValidationMessage } from '../enums/enums.js';
import { type SubscriptionPaymentIntentCancelRequestDto } from '../types/types.js';

const cancelPaymentIntent = joi.object<
  SubscriptionPaymentIntentCancelRequestDto,
  true
>({
  id: joi.string().trim().required().messages({
    'any.required': SubscriptionValidationMessage.ID_REQUIRED,
  }),
});

export { cancelPaymentIntent };
