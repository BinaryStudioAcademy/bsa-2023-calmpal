import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppRoute } from '#libs/enums/enums.js';
import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type SubscriptionPaymentIntentCreateRequestDto,
  type SubscriptionPaymentIntentCreateResponseDto,
} from '#packages/subscriptions/subscriptions.js';
import { actions as appActions } from '#slices/app/app.js';

import { type ConfirmPaymentPayload } from './libs/types/types.js';
import { name as sliceName } from './subscription.slice.js';

const createPaymentIntent = createAsyncThunk<
  SubscriptionPaymentIntentCreateResponseDto,
  SubscriptionPaymentIntentCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-payment-intent`, async (payload, { extra }) => {
  const { subscriptionApi } = extra;

  return await subscriptionApi.createPaymentIntent(payload);
});

const confirmPaymentIntent = createAsyncThunk<
  unknown,
  ConfirmPaymentPayload,
  AsyncThunkConfig
>(
  `${sliceName}/confirm-payment-intent`,
  async (payload, { extra, dispatch }) => {
    const { stripe, elements } = payload;
    const { notification, subscriptionApi } = extra;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${AppRoute.PROFILE_SUBSCRIPTION}`,
      },
      redirect: 'if_required',
    });

    if (
      error &&
      (error.type === 'card_error' || error.type === 'validation_error')
    ) {
      notification.error(error.message as string);
    } else {
      await subscriptionApi.subscribe();
      dispatch(appActions.navigate(AppRoute.PROFILE_SUBSCRIPTION));
    }
  },
);

const cancelPaymentIntent = createAsyncThunk<
  unknown,
  { id: string },
  AsyncThunkConfig
>(
  `${sliceName}/cancel-payment-intent`,
  async (payload, { extra, dispatch }) => {
    const { subscriptionApi } = extra;

    await subscriptionApi.cancelPaymentIntent(payload);
    dispatch(appActions.navigate(AppRoute.PROFILE_SUBSCRIPTION));
  },
);

export { cancelPaymentIntent, confirmPaymentIntent, createPaymentIntent };
