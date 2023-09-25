import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type SubscriptionPaymentIntentCreateRequestDto,
  type SubscriptionPaymentIntentCreateResponseDto,
} from '#packages/subscriptions/subscriptions.js';

import { name as sliceName } from './subscription.slice.js';

const createPaymentIntent = createAsyncThunk<
  SubscriptionPaymentIntentCreateResponseDto,
  SubscriptionPaymentIntentCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-payment-intent`, async (payload, { extra }) => {
  const { subscriptionApi } = extra;

  return await subscriptionApi.createPaymentIntent(payload);
});

export { createPaymentIntent };
