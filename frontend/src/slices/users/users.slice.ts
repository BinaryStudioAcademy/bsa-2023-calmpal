import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { deleteUser } from './actions.js';

type State = {
  authDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  authDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'users',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteUser.pending, (state) => {
      state.authDataStatus = DataStatus.PENDING;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.authDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.authDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
