import { config } from '#libs/packages/config/config.js';
import { http } from '#libs/packages/http/http.js';
import { storage } from '#libs/packages/storage/storage.js';

import { SubscriptionApi } from './subscription-api.js';

const subscriptionApi = new SubscriptionApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  http,
  storage,
});

export { subscriptionApi };
export { SUBSCRIPTION_PRICE } from './libs/constants/constants.js';
export {
  type SubscriptionPaymentIntentCreateRequestDto,
  type SubscriptionPaymentIntentCreateResponseDto,
} from './libs/types/types.js';
