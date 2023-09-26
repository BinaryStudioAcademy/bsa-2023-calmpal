import { billing } from '#libs/packages/billing/billing.js';
import { logger } from '#libs/packages/logger/logger.js';

import { SubscriptionController } from './subscription.controller.js';
import { SubscriptionModel } from './subscription.model.js';
import { SubscriptionRepository } from './subscription.repository.js';
import { SubscriptionService } from './subscription.service.js';

const subscriptionRepository = new SubscriptionRepository(SubscriptionModel);
const subscriptionService = new SubscriptionService({
  billing,
  subscriptionRepository,
});

const subscriptionController = new SubscriptionController(
  logger,
  subscriptionService,
);

export { subscriptionController };
export { SubscriptionsTableColumn } from './libs/enums/enums.js';
export { SubscriptionModel } from './subscription.model.js';
