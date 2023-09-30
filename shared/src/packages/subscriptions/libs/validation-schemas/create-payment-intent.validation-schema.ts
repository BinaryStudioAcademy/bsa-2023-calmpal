import joi from 'joi';

import {
  SubscriptionValidationMessage,
  SubscriptionValidationRule,
} from '../enums/enums.js';
import { type SubscriptionPaymentIntentCreateRequestDto } from '../types/types.js';

const createPaymentIntent = joi.object<
  SubscriptionPaymentIntentCreateRequestDto,
  true
>({
  price: joi
    .number()
    .required()
    .min(SubscriptionValidationRule.MINIMUM_PRICE_VALUE)
    .messages({
      'any.required': SubscriptionValidationMessage.PRICE_REQUIRED,
      'number.min': SubscriptionValidationMessage.PRICE_MUST_BE_AT_LEAST,
    }),
});

export { createPaymentIntent };
