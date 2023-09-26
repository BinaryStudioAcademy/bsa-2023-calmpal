import { SubscriptionValidationRule } from './subscription-validation-rule.enum.js';

const SubscriptionValidationMessage = {
  ID_REQUIRED: 'Id is required.',
  PRICE_REQUIRED: 'Price is required.',
  PRICE_MUST_BE_AT_LEAST: `Price must be at least ${SubscriptionValidationRule.MINIMUM_PRICE_VALUE}.`,
} as const;

export { SubscriptionValidationMessage };
