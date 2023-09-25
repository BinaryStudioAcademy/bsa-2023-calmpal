import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

type State = {
  clientSecret: string | null;
  confirmPaymentDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  clientSecret: null,
  confirmPaymentDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'subscription',
  reducers: {},
});

export { actions, name, reducer };
