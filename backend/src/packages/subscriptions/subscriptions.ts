import { billing } from '#libs/packages/billing/billing.js';
import { logger } from '#libs/packages/logger/logger.js';

import { SubscriptionController } from './subscription.controller.js';
import { SubscriptionService } from './subscription.service.js';

const subscriptionService = new SubscriptionService({
  billing,
});

const subscriptionController = new SubscriptionController(
  logger,
  subscriptionService,
);

export { subscriptionController };
