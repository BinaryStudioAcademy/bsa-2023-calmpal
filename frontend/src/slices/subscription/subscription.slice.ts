import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import {
  cancelPaymentIntent,
  confirmPaymentIntent,
  createPaymentIntent,
} from './actions.js';

type State = {
  paymentId: string | null;
  clientSecret: string | null;
  confirmPaymentDataStatus: ValueOf<typeof DataStatus>;
  createPaymentDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  paymentId: null,
  clientSecret: null,
  confirmPaymentDataStatus: DataStatus.IDLE,
  createPaymentDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'subscription',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPaymentIntent.pending, (state) => {
      state.createPaymentDataStatus = DataStatus.PENDING;
    });

    builder.addCase(createPaymentIntent.fulfilled, (state, action) => {
      state.paymentId = action.payload.id;
      state.clientSecret = action.payload.clientSecret;
      state.createPaymentDataStatus = DataStatus.FULFILLED;
    });

    builder.addCase(createPaymentIntent.rejected, (state) => {
      state.createPaymentDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(confirmPaymentIntent.pending, (state) => {
      state.confirmPaymentDataStatus = DataStatus.PENDING;
    });

    builder.addCase(confirmPaymentIntent.fulfilled, (state) => {
      state.confirmPaymentDataStatus = DataStatus.FULFILLED;
    });

    builder.addCase(confirmPaymentIntent.rejected, (state) => {
      state.confirmPaymentDataStatus = DataStatus.REJECTED;
    });

    builder.addCase(cancelPaymentIntent.fulfilled, (state) => {
      state.paymentId = null;
      state.clientSecret = null;
    });
  },
});

export { actions, name, reducer };
